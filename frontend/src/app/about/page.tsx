import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Shield, BookOpen, MessageCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 md:py-20 mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Heart className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Open Heart AI</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Providing accurate, compassionate sexual health education through
          artificial intelligence.
        </p>
      </div>

      <Separator className="my-8" />

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
          <p className="text-muted-foreground mb-4 text-center">
            Open Heart AI was created to address the gap in accessible, accurate sexual health
            education. We believe everyone deserves access to reliable information about
            sexual health without judgment or embarrassment.
          </p>
          <p className="text-muted-foreground text-center">
            Through our AI-powered platform, we aim to provide evidence-based answers to
            questions that people might feel uncomfortable asking elsewhere, empowering
            individuals to make informed decisions about their sexual health.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Our Approach</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Privacy First</h3>
                </div>
                <p className="text-muted-foreground">
                  We prioritize your privacy. All conversations with our AI are confidential
                  and not stored longer than necessary to provide our service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Evidence-Based</h3>
                </div>
                <p className="text-muted-foreground">
                  Our AI is trained on medically accurate, up-to-date information from
                  reputable sources in sexual health education and medicine.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Who We Serve</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-4 text-center">
              Open Heart AI is designed for anyone seeking reliable information about sexual
              health, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground max-w-xl mx-auto">
              <li>Young adults navigating their sexual health education</li>
              <li>Parents looking for guidance on how to discuss sexual health with their children</li>
              <li>Educators seeking supplementary resources for comprehensive sex education</li>
              <li>Individuals of all ages with questions they might feel uncomfortable asking elsewhere</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
          <p className="text-muted-foreground mb-6 text-center">
            Have questions, feedback, or suggestions? We would love to hear from you.
          </p>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Get in Touch</h3>
                  <p className="text-muted-foreground">Email: contact@openheartai.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
