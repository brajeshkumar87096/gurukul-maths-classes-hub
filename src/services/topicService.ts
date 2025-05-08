
import { supabase, Topic, Resource, RelatedTopic } from '@/lib/supabase';

// Offline fallback data
const offlineTopics: Topic[] = [
  {
    id: "algebra",
    name: "Algebra",
    description: "Linear equations, polynomials, factoring, and more",
    long_description: "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating these symbols. In elementary algebra, those symbols represent quantities without fixed values, known as variables. The study of algebra helps develop logical thinking and problem-solving skills that are valuable in many fields.",
    icon: "➗",
    color: "bg-blue-50",
    text_color: "text-blue-600",
    created_at: new Date().toISOString()
  },
  {
    id: "geometry",
    name: "Geometry",
    description: "Shapes, angles, area, perimeter, and volume",
    long_description: "Geometry is a branch of mathematics concerned with questions of shape, size, relative position of figures, and the properties of space. Geometry is one of the oldest mathematical sciences and has applications in architecture, engineering, physics, and many other fields.",
    icon: "📐",
    color: "bg-green-50",
    text_color: "text-green-600",
    created_at: new Date().toISOString()
  },
  {
    id: "arithmetic",
    name: "Arithmetic",
    description: "Basic operations, fractions, decimals, and percentages",
    long_description: "Arithmetic is a branch of mathematics that consists of the study of numbers, especially the properties of traditional operations on them—addition, subtraction, multiplication, division, exponentiation, and extraction of roots. Arithmetic is an elementary part of number theory.",
    icon: "🔢",
    color: "bg-amber-50",
    text_color: "text-amber-600",
    created_at: new Date().toISOString()
  },
  {
    id: "statistics",
    name: "Statistics",
    description: "Data analysis, probability, and graphing",
    long_description: "Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data. Statistics deals with all aspects of this, including the planning of data collection in terms of the design of surveys and experiments.",
    icon: "📊",
    color: "bg-purple-50",
    text_color: "text-purple-600",
    created_at: new Date().toISOString()
  },
  {
    id: "trigonometry",
    name: "Trigonometry",
    description: "Sine, cosine, tangent, and triangles",
    long_description: "Trigonometry is a branch of mathematics that studies relationships between side lengths and angles of triangles. The field emerged in the Hellenistic world during the 3rd century BC from applications of geometry to astronomical studies.",
    icon: "📏",
    color: "bg-rose-50",
    text_color: "text-rose-600",
    created_at: new Date().toISOString()
  },
  {
    id: "calculus",
    name: "Calculus",
    description: "Limits, derivatives, integrals, and applications",
    long_description: "Calculus is the mathematical study of continuous change. It has two major branches: differential calculus (concerning rates of change and slopes of curves), and integral calculus (concerning accumulation of quantities and the areas under and between curves).",
    icon: "∫",
    color: "bg-teal-50",
    text_color: "text-teal-600",
    created_at: new Date().toISOString()
  }
];

const offlineResources: Record<string, Resource[]> = {
  "algebra": [
    {
      id: "alg-1",
      topic_id: "algebra",
      title: "Algebra Fundamentals",
      description: "A comprehensive introduction to algebraic concepts",
      file_path: "algebra/fundamentals.pdf",
      file_size: "2.3 MB",
      file_type: "pdf",
      created_at: new Date().toISOString()
    },
    {
      id: "alg-2",
      topic_id: "algebra",
      title: "Solving Equations Worksheet",
      description: "Practice problems for linear and quadratic equations",
      file_path: "algebra/equations.pdf",
      file_size: "1.1 MB",
      file_type: "pdf",
      created_at: new Date().toISOString()
    }
  ],
  "geometry": [
    {
      id: "geo-1",
      topic_id: "geometry",
      title: "Geometry Basics",
      description: "Introduction to points, lines, planes, and angles",
      file_path: "geometry/basics.pdf",
      file_size: "3.2 MB",
      file_type: "pdf",
      created_at: new Date().toISOString()
    }
  ]
};

const offlineRelatedTopics: Record<string, string[]> = {
  "algebra": ["calculus", "trigonometry"],
  "geometry": ["trigonometry", "algebra"],
  "arithmetic": ["algebra"],
  "statistics": ["algebra"],
  "trigonometry": ["geometry", "calculus"],
  "calculus": ["algebra", "trigonometry"]
};

export const fetchAllTopics = async (): Promise<Topic[]> => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching topics:', error);
      return offlineTopics;
    }

    return data && data.length > 0 ? data : offlineTopics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return offlineTopics;
  }
};

export const fetchTopicById = async (topicId: string): Promise<Topic | null> => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', topicId)
      .single();

    if (error) {
      console.error(`Error fetching topic ${topicId}:`, error);
      return offlineTopics.find(t => t.id === topicId) || null;
    }

    return data || offlineTopics.find(t => t.id === topicId) || null;
  } catch (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    return offlineTopics.find(t => t.id === topicId) || null;
  }
};

export const fetchResourcesByTopicId = async (topicId: string): Promise<Resource[]> => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('topic_id', topicId)
      .order('title');

    if (error) {
      console.error(`Error fetching resources for topic ${topicId}:`, error);
      return offlineResources[topicId] || [];
    }

    return data && data.length > 0 ? data : (offlineResources[topicId] || []);
  } catch (error) {
    console.error(`Error fetching resources for topic ${topicId}:`, error);
    return offlineResources[topicId] || [];
  }
};

export const fetchRelatedTopics = async (topicId: string): Promise<Topic[]> => {
  try {
    // First try to get the related topic IDs from Supabase
    const { data: relatedData, error: relatedError } = await supabase
      .from('related_topics')
      .select('related_topic_id')
      .eq('topic_id', topicId);

    // If there's an error or no data, use offline data
    if (relatedError || !relatedData || relatedData.length === 0) {
      const relatedIds = offlineRelatedTopics[topicId] || [];
      return offlineTopics.filter(topic => relatedIds.includes(topic.id));
    }

    // Extract the related topic IDs
    const relatedTopicIds = relatedData.map(item => item.related_topic_id);

    // Then fetch the actual topic data
    const { data: topicsData, error: topicsError } = await supabase
      .from('topics')
      .select('*')
      .in('id', relatedTopicIds);

    if (topicsError || !topicsData || topicsData.length === 0) {
      const relatedIds = offlineRelatedTopics[topicId] || [];
      return offlineTopics.filter(topic => relatedIds.includes(topic.id));
    }

    return topicsData;
  } catch (error) {
    console.error(`Error fetching related topics for ${topicId}:`, error);
    const relatedIds = offlineRelatedTopics[topicId] || [];
    return offlineTopics.filter(topic => relatedIds.includes(topic.id));
  }
};

export const downloadResource = async (filePath: string): Promise<string> => {
  try {
    // Try to get a signed URL from Supabase
    const { data, error } = await supabase.storage
      .from('resources')
      .createSignedUrl(filePath, 60); // URL valid for 60 seconds

    if (error) {
      // If there's an error, return a placeholder URL
      console.error(`Error generating download URL for ${filePath}:`, error);
      return `https://placeholder-file-download.com/${filePath}`;
    }

    return data.signedUrl;
  } catch (error) {
    console.error(`Error downloading resource ${filePath}:`, error);
    return `https://placeholder-file-download.com/${filePath}`;
  }
};

export const saveResourceForUser = async (userId: string, resourceId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('saved_resources')
      .insert({ user_id: userId, resource_id: resourceId });

    if (error) {
      console.error(`Error saving resource ${resourceId} for user ${userId}:`, error);
    }
  } catch (error) {
    console.error(`Error saving resource ${resourceId} for user ${userId}:`, error);
  }
};
