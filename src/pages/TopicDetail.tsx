
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, BookOpen, Clock, FileText, Loader2, Bookmark } from "lucide-react";
import { toast } from "sonner";
import { fetchTopicById, fetchResourcesByTopicId, fetchRelatedTopics, downloadResource } from "@/services/topicService";
import { toggleSaveResource, isResourceSaved } from "@/services/resourceService";
import { Topic, Resource } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const TopicDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [relatedTopics, setRelatedTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedResources, setSavedResources] = useState<Record<string, boolean>>({});
  const { user } = useAuth();

  useEffect(() => {
    const loadTopicData = async () => {
      if (!topicId) return;
      
      setLoading(true);
      try {
        // Fetch the topic
        const topicData = await fetchTopicById(topicId);
        if (!topicData) {
          throw new Error("Topic not found");
        }
        setTopic(topicData);
        
        // Fetch resources for this topic
        const resourcesData = await fetchResourcesByTopicId(topicId);
        setResources(resourcesData);
        
        // Fetch related topics
        const relatedTopicsData = await fetchRelatedTopics(topicId);
        setRelatedTopics(relatedTopicsData);

        // If user is logged in, check which resources are saved
        if (user) {
          const savedStatus: Record<string, boolean> = {};
          for (const resource of resourcesData) {
            savedStatus[resource.id] = await isResourceSaved(user.id, resource.id);
          }
          setSavedResources(savedStatus);
        }
      } catch (error) {
        console.error("Error loading topic data:", error);
        toast.error("Failed to load topic data");
      } finally {
        setLoading(false);
      }
    };

    loadTopicData();
  }, [topicId, user]);

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      toast.info(`Preparing ${fileName} for download...`);
      const downloadUrl = await downloadResource(filePath);
      
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Downloading ${fileName}`);
    } catch (error) {
      console.error("Error downloading resource:", error);
      toast.error("Failed to download resource");
    }
  };

  const handleToggleSave = async (resourceId: string) => {
    if (!user) {
      toast.error("Please login to save resources");
      return;
    }

    try {
      const result = await toggleSaveResource(user.id, resourceId);
      
      if (result.success) {
        setSavedResources(prev => ({
          ...prev,
          [resourceId]: result.saved
        }));
        
        toast.success(result.saved ? "Resource saved successfully" : "Resource removed from saved items");
      } else {
        toast.error(result.error || "Failed to save resource");
      }
    } catch (error) {
      console.error("Error toggling save status:", error);
      toast.error("An error occurred while saving the resource");
    }
  };

  const formattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-gurukul-purple mx-auto" />
            <p className="mt-4 text-gray-600">Loading topic...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Topic Not Found</h1>
            <p className="text-gray-700 mb-8">
              The topic you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link to="/topics">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Topic Header */}
        <div className={`${topic.color} py-16`}>
          <div className="container mx-auto px-4">
            <Link to="/topics" className="inline-flex items-center text-gray-600 hover:text-gurukul-purple mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Topics
            </Link>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="text-6xl">{topic.icon}</div>
              <div>
                <h1 className={`text-4xl font-bold ${topic.text_color}`}>
                  {topic.name}
                </h1>
                <p className="text-lg text-gray-700 mt-2">
                  {topic.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Topic Content */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <p className="text-gray-700 mb-8">
                  {topic.long_description}
                </p>
                
                <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
                {resources.length === 0 ? (
                  <div className="bg-gray-50 border rounded-lg p-8 text-center">
                    <p className="text-gray-500">No resources available for this topic yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {resources.map((resource) => (
                      <div key={resource.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between">
                          <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                          <div className="flex gap-2">
                            {user && (
                              <Button 
                                variant="outline" 
                                size="icon"
                                className={savedResources[resource.id] ? "text-yellow-500 border-yellow-500" : "text-gray-400 border-gray-300"}
                                onClick={() => handleToggleSave(resource.id)}
                              >
                                <Bookmark className="h-4 w-4" fill={savedResources[resource.id] ? "currentColor" : "none"} />
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              className="text-gurukul-purple border-gurukul-purple"
                              onClick={() => handleDownload(resource.file_path, resource.title)}
                            >
                              <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">
                          {resource.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FileText className="mr-1 h-4 w-4" /> {resource.file_type.toUpperCase()}
                          </span>
                          {resource.file_size && (
                            <span className="flex items-center">
                              <BookOpen className="mr-1 h-4 w-4" /> {resource.file_size}
                            </span>
                          )}
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" /> Added {formattedDate(resource.created_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div>
                <div className="sticky top-24">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-semibold">Related Topics</h3>
                    </div>
                    <div className="p-4">
                      {relatedTopics.length === 0 ? (
                        <p className="text-sm text-gray-500">No related topics found.</p>
                      ) : (
                        <ul className="space-y-2">
                          {relatedTopics.map((relatedTopic) => (
                            <li key={relatedTopic.id}>
                              <Link 
                                to={`/topics/${relatedTopic.id}`} 
                                className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                              >
                                <span className="text-2xl mr-3">{relatedTopic.icon}</span>
                                <span>{relatedTopic.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gurukul-purple/10 rounded-lg p-6 text-center">
                    <h3 className="font-semibold mb-3">Need Help With This Topic?</h3>
                    <p className="text-gray-700 mb-4">Contact our instructor directly for personalized assistance.</p>
                    <Button asChild className="w-full bg-gurukul-purple hover:bg-gurukul-purple/90">
                      <Link to="/contact">Contact Instructor</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TopicDetail;
