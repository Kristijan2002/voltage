import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, CheckCircle, Clock, Euro, Shield, Settings, Zap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import Head from 'next/head';
import { servicesAPI } from '../../lib/firebase-services';
import { Service } from '../../types/data';
import { useLanguage } from '@/components/LanguageProvider';

export default function ServiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const loadService = async () => {
      if (id && typeof id === 'string') {
        try {
          setLoading(true);
          setError(null);
          
          const foundService = await servicesAPI.getById(id);
          if (foundService) {
            setService(foundService);
          } else {
            setError('Storitev ni bila najdena');
          }
        } catch (err) {
          setError('Napaka pri nalaganju storitve');
        } finally {
          setLoading(false);
        }
      }
    };

    loadService();
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

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Storitev ni bila najdena</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'Storitev, ki jo iščete, ne obstaja.'}
          </p>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('services.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} - Voltage Elektroinštalacije</title>
        <meta name="description" content={service.description} />
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
              {t('services.backToHome')}
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-yellow-50">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <div className="text-6xl mb-6">{service.icon}</div>
              <h1 className="mb-6 text-4xl md:text-6xl font-bold">
                {service.title}
              </h1>
              <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
                {service.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="bg-yellow-500 text-black px-4 py-2 text-lg">
                  💰 {service.price}
                </Badge>
                <Badge variant="secondary" className="bg-blue-500 text-white px-4 py-2 text-lg">
                  ⏱️ {service.duration}
                </Badge>
                {service.warranty && (
                  <Badge variant="secondary" className="bg-green-500 text-white px-4 py-2 text-lg">
                    🛡️ {service.warranty}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                {service.details && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">{t('services.aboutService')}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.details}
                    </p>
                  </div>
                )}

                {/* Process */}
                {service.process && service.process.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">{t('services.workProcess')}</h2>
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What's Included */}
                {service.included && service.included.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">{t('details.included')}</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.included.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      {t('services.quichInfo')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t('details.price')}:</span>
                      <span className="font-semibold">{service.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t('details.duration')}:</span>
                      <span className="font-semibold">{service.duration}</span>
                    </div>
                    {service.warranty && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('details.warranty')}:</span>
                        <span className="font-semibold">{service.warranty}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Materials */}
                {service.materials && service.materials.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-blue-500" />
                        {t('services.materials')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {service.materials.map((material, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {material}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Brands */}
                {service.brands && service.brands.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        {t('services.brands')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {service.brands.map((brand, index) => (
                          <Badge key={index} variant="outline">
                            {brand}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA */}
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-3">{t('details.need.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('details.need.contactUs')}
                    </p>
                    <Button 
                      onClick={() => router.push('/#kontakt')}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      {t('contact.title')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services CTA */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('services.need')}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('services.otherServices')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push('/#storitve')} variant="outline">
               {t('services.allServices')}
              </Button>
              <Button onClick={() => router.push('/#kontakt')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                {t('navigation.contact')}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
