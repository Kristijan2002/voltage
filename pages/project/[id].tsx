import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Calendar, MapPin, Camera, Euro, Clock, Users, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import Head from 'next/head';
import { projectsAPI } from '../../lib/firebase-services';
import { Project } from '../../types/data';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (id && typeof id === 'string') {
        try {
          setLoading(true);
          setError(null);
          console.log('Loading project with ID:', id);
          
          const foundProject = await projectsAPI.getById(id);
          if (foundProject) {
            console.log('Project found:', foundProject);
            setProject(foundProject);
          } else {
            console.log('Project not found');
            setError('Projekt ni bil najden');
          }
        } catch (err) {
          console.error('Error loading project:', err);
          setError('Napaka pri nalaganju projekta');
        } finally {
          setLoading(false);
        }
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Nalaganje...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projekt ni bil najden</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'Projekt, ki ga iščete, ne obstaja.'}
          </p>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nazaj na domačo stran
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} - Voltage Elektroinštalacije</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Nazaj na domačo stran
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-yellow-50">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-yellow-500 text-black hover:bg-yellow-600">
                {project.category}
              </Badge>
              <h1 className="mb-6 text-4xl md:text-6xl font-bold">
                {project.title}
              </h1>
              <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
                {project.fullDescription || project.description}
              </p>
              
              {/* Project Stats */}
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="font-semibold">Lokacija</h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold">Leto</h3>
                  <p className="text-sm text-muted-foreground">{project.year}</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold">Trajanje</h3>
                  <p className="text-sm text-muted-foreground">{project.duration}</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold">Stranka</h3>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Project Image */}
              <div>
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-black">
                      {project.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-8">
                {project.details && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">O projektu</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.details}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  {project.budget && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Euro className="h-4 w-4 text-yellow-500" />
                        Proračun
                      </h3>
                      <p className="text-muted-foreground">{project.budget}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Trajanje
                    </h3>
                    <p className="text-muted-foreground">{project.duration}</p>
                  </div>
                </div>

                <Separator />

                {/* Challenges & Solutions */}
                {project.challenges && project.challenges.length > 0 && project.solutions && project.solutions.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Izzivi in rešitve</h3>
                    <div className="space-y-4">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Izziv {index + 1}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{challenge}</p>
                          {project.solutions && project.solutions[index] && (
                            <p className="text-sm">
                              <span className="font-medium">Rešitev:</span> {project.solutions[index]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Results */}
                {project.results && project.results.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Rezultati</h3>
                    <div className="space-y-3">
                      {project.results.map((result, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {project.testimonial && (
          <section className="py-20 px-4 bg-muted/50">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-12">Mnenje stranke</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-lg italic mb-4">&ldquo;{project.testimonial.text}&rdquo;</p>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <p className="font-medium">{project.testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{project.testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Potrebujete podobno rešitev?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Kontaktirajte nas za brezplačno oceno vašega projekta
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => router.push('/#kontakt')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Kontaktirajte nas
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push('/#portfolio')}
                >
                  Oglejte si več projektov
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
