import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, BookOpen, FileText, Globe, Video } from "lucide-react";
import Link from "next/link";

type Resource = {
  title: string;
  description: string;
  link: string;
  icon: React.ElementType;
};

const websites: Resource[] = [
  {
    title: "Planned Parenthood",
    description: "Comprehensive sexual health information and resources.",
    link: "https://www.plannedparenthood.org/learn",
    icon: Globe,
  },
  {
    title: "Scarleteen",
    description: "Inclusive, comprehensive, and smart sexuality information and help for teens and young adults.",
    link: "https://www.scarleteen.com/",
    icon: Globe,
  },
  {
    title: "AMAZE",
    description: "Age-appropriate sexual health videos and resources for young people.",
    link: "https://amaze.org/",
    icon: Globe,
  },
];

const articles: Resource[] = [
  {
    title: "Understanding Consent",
    description: "A comprehensive guide to understanding and practicing consent in relationships.",
    link: "#",
    icon: FileText,
  },
  {
    title: "STI Prevention and Testing",
    description: "Information about preventing, testing for, and treating sexually transmitted infections.",
    link: "#",
    icon: FileText,
  },
  {
    title: "Contraception Options",
    description: "An overview of different contraception methods, their effectiveness, and considerations.",
    link: "#",
    icon: FileText,
  },
];

const books: Resource[] = [
  {
    title: "Come As You Are",
    description: "By Emily Nagoski - The surprising new science that will transform your sex life.",
    link: "#",
    icon: BookOpen,
  },
  {
    title: "S.E.X.",
    description: "By Heather Corinna - The all-you-need-to-know sexuality guide to get you through your teens and twenties.",
    link: "#",
    icon: BookOpen,
  },
  {
    title: "The Guide to Getting It On",
    description: "By Paul Joannides - A comprehensive guide to sex for adults of all ages and stages.",
    link: "#",
    icon: BookOpen,
  },
];

const videos: Resource[] = [
  {
    title: "Sex Education Series",
    description: "Educational videos covering various aspects of sexual health and relationships.",
    link: "#",
    icon: Video,
  },
  {
    title: "Consent Explained",
    description: "Visual explanations of consent concepts using relatable examples.",
    link: "#",
    icon: Video,
  },
  {
    title: "Understanding Your Body",
    description: "Anatomical and physiological information about reproductive health.",
    link: "#",
    icon: Video,
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = resource.icon;
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{resource.title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={resource.link} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="outline" className="w-full">
            Visit Resource
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function ResourcesPage() {
  return (
    <div className="container py-12 px-4 md:py-20 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Sexual Health Resources</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collection of trusted resources to further your understanding of sexual health.
        </p>
      </div>

      <Tabs defaultValue="websites" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-4 mb-8 mx-auto max-w-md">
          <TabsTrigger value="websites">Websites</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="websites" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {websites.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="articles" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="books" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {books.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {videos.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Need More Personalized Information?</h2>
        <p className="text-muted-foreground mb-6">
          Our AI chatbot can provide answers to your specific questions about sexual health in a private, judgment-free environment.
        </p>
        <Link href="/chat">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Chat with Open Heart AI
          </Button>
        </Link>
      </div>
    </div>
  );
}
