import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Zap, CheckCircle, Menu, X, ArrowLeft, Euro, Clock, Shield, Settings, Camera, Users, Lock, Plus, Edit, Trash2, Save, Calendar, User, Award, Target } from 'lucide-react';
import Cookies from 'js-cookie';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../components/LanguageProvider';
import { servicesAPI, projectsAPI, faqsAPI } from '../lib/firebase-services';
import { Service, Project, FAQ } from '../types/data';

// Logo path - image is now in public directory
const logoPath = '/logo.png';

export default function Home() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  
  // State for content management - initialize with initial data to prevent loss
  const [services, setServices] = useState<Service[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  
  // State to track if data has been loaded from localStorage
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // State for UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Load data from Firebase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Starting to load data from Firebase...');
        
        // Load services
        console.log('Loading services...');
        const fetchedServices = await servicesAPI.getAll();
        if (fetchedServices && fetchedServices.length > 0) {
          console.log(`Successfully loaded ${fetchedServices.length} services from Firebase`);
          setServices(fetchedServices);
        } else {
          console.log('No services found in Firebase, using fallback data');
          // Fallback to initial data if no services found
          setServices([
           
          ]);
        }

        // Load projects
        console.log('Loading projects...');
        const fetchedProjects = await projectsAPI.getAll();
        if (fetchedProjects && fetchedProjects.length > 0) {
          console.log(`Successfully loaded ${fetchedProjects.length} projects from Firebase`);
          setPortfolioProjects(fetchedProjects);
        } else {
          console.log('No projects found in Firebase, using fallback data');
          // Fallback to initial data if no projects found
          setPortfolioProjects([
           
          ]);
        }

        // Load FAQs
        console.log('Loading FAQs...');
        const fetchedFaqs = await faqsAPI.getAll();
        if (fetchedFaqs && fetchedFaqs.length > 0) {
          console.log(`Successfully loaded ${fetchedFaqs.length} FAQs from Firebase`);
          setFaqs(fetchedFaqs);
        } else {
          console.log('No FAQs found in Firebase, using fallback data');
          // Fallback to initial data if no FAQs found
          setFaqs([
           
          ]);
        }
      } catch (error) {
        console.error('Error loading data from Firebase:', error);
        // Set initial data if there's an error
        setServices([
         
        ]);
        setPortfolioProjects([
        
        ]);
        setFaqs([
          
        ]);
      }
      
      // Always set data as loaded, regardless of localStorage content
      setIsDataLoaded(true);
    };

    loadData();
  }, []);

  // Save data to localStorage only when data changes and is not empty
  useEffect(() => {
    if (typeof window !== 'undefined' && isDataLoaded && services.length > 0) {
      // servicesAPI.saveAllServices(services); // Uncomment if you want to save to Firebase
    }
  }, [services, isDataLoaded]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isDataLoaded && portfolioProjects.length > 0) {
      // projectsAPI.saveAllProjects(portfolioProjects); // Uncomment if you want to save to Firebase
    }
  }, [portfolioProjects, isDataLoaded]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isDataLoaded && faqs.length > 0) {
      // faqsAPI.saveAllFaqs(faqs); // Uncomment if you want to save to Firebase
    }
  }, [faqs, isDataLoaded]);

  // Function to reset data to initial values
  const resetToInitialData = () => {
    // setServices(initialServices); // This line is no longer needed as data is from Firebase
    // setPortfolioProjects(initialProjects); // This line is no longer needed as data is from Firebase
    // setFaqs(initialFaqs); // This line is no longer needed as data is from Firebase
    
    // Clear localStorage to force fresh start
    // if (typeof window !== 'undefined') {
    //   localStorage.removeItem('voltage-services');
    //   localStorage.removeItem('voltage-projects');
    //   localStorage.removeItem('voltage-faqs');
    // }
  };

  // Handlers
  const handleServiceClick = (serviceId: string) => {
    router.push(`/service/${serviceId}`);
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sporočilo je bilo poslano! Kontaktirali vas bomo v najkrajšem možnem času.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const filteredProjects = selectedCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory);

  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'all') return 'Vsa dela';
    if (categoryId === 'nove-instalacije') return 'Nove instalacije';
    if (categoryId === 'pametni-sistemi') return 'Pametni sistemi';
    if (categoryId === 'varnostni-sistemi') return 'Varnostni sistemi';
    const service = services.find(s => s.id === categoryId);
    return service ? service.title : 'Vsa dela';
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Voltage Elektroinštalacije s.p. - Profesionalne elektroinštalacije</title>
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logoPath} alt="Voltage Logo" className="h-20 w-auto" />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('domov')} className="text-foreground hover:text-primary transition-colors">
                {t('navigation.home')}
              </button>
              <button onClick={() => scrollToSection('storitve')} className="text-foreground hover:text-primary transition-colors">
                {t('navigation.services')}
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-foreground hover:text-primary transition-colors">
                {t('navigation.portfolio')}
              </button>
              <button onClick={() => scrollToSection('vprasanja')} className="text-foreground hover:text-primary transition-colors">
                {t('navigation.faq')}
              </button>
              <button onClick={() => scrollToSection('kontakt')} className="text-foreground hover:text-primary transition-colors">
                {t('navigation.contact')}
              </button>
                  <Button 
                  variant="ghost" 
                  onClick={() => router.push('/voltageAdminSecretRouteDoNotShare')} 
                  className="text-sm flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  {t('navigation.admin')}
                </Button>
            </nav>

            {/* Language Switcher */}
            <span className=''>
            <LanguageSwitcher />
            </span>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-border">
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <button onClick={() => scrollToSection('domov')} className="text-left text-foreground hover:text-primary transition-colors">
                  {t('navigation.home')}
                </button>
                <button onClick={() => scrollToSection('storitve')} className="text-left text-foreground hover:text-primary transition-colors">
                  {t('navigation.services')}
                </button>
                <button onClick={() => scrollToSection('portfolio')} className="text-left text-foreground hover:text-primary transition-colors">
                  {t('navigation.portfolio')}
                </button>
                <button onClick={() => scrollToSection('vprasanja')} className="text-left text-foreground hover:text-primary transition-colors">
                  {t('navigation.faq')}
                </button>
                <button onClick={() => scrollToSection('kontakt')} className="text-left text-foreground hover:text-primary transition-colors">
                  {t('navigation.contact')}
                </button>
                <Button 
                  variant="ghost" 
                  onClick={() => router.push('/voltageAdminSecretRouteDoNotShare')} 
                  className="justify-start text-sm flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  {t('navigation.admin')}
                </Button>
                
                {/* Language Switcher for Mobile */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{t('common.language') || 'Language'}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setLanguage('sl');
                          Cookies.set('NEXT_LOCALE', 'sl', { expires: 365 });
                        }}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          language === 'sl'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        SL
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('en');
                          Cookies.set('NEXT_LOCALE', 'en', { expires: 365 });
                        }}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          language === 'en'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section id="domov" className="py-20  bg-gradient-to-br from-blue-50 to-yellow-50">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="mb-6 text-4xl md:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => scrollToSection('kontakt')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Zap className="mr-2 h-4 w-4" />
                  {t('hero.callToAction')}
                </Button>
                <Button variant="outline" onClick={() => scrollToSection('storitve')}>
                  {t('hero.servicesButton')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="storitve" className="py-20 ">
          <div className="container sm:w-[80%] mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">{t('services.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('services.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!isDataLoaded ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-muted rounded"></div>
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                      </div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                      </div>
                      <div className="h-10 bg-muted rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                services.filter(service => service.language === language).map((service) => (
                  <Card key={service.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{service.icon}</span>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                        <span>Od {service.price}</span>
                        <span>{service.duration}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleServiceClick(service.id)}
                      >
                        Podrobnosti storitve
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-[#f5f5f7]">
          <div className="container sm:w-[80%] mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">{t('portfolio.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('portfolio.subtitle')}
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}
              >
                {t('portfolio.allProjects')}
              </Button>
              {!isDataLoaded ? (
                // Loading skeleton for category buttons
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-10 w-24 bg-muted rounded animate-pulse"></div>
                ))
              ) : (
                services.map((service) => (
                  <Button
                    key={service.id}
                    variant={selectedCategory === service.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(service.id)}
                    className={selectedCategory === service.id ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}
                  >
                    {service.title}
                  </Button>
                ))
              )}
            </div>

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {!isDataLoaded ? (
                // Loading skeleton for portfolio grid
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="relative overflow-hidden">
                      <div className="w-full h-48 bg-muted"></div>
                      <div className="absolute top-4 right-4">
                        <div className="h-6 w-20 bg-muted rounded"></div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-muted rounded w-full mb-3"></div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 bg-muted rounded"></div>
                          <div className="h-4 bg-muted rounded w-20"></div>
                        </div>
                        <div className="h-8 bg-muted rounded w-20"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-yellow-500 text-black">
                          {getCategoryName(project.category)}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Camera className="h-4 w-4" />
                          <span>{project.location}, {project.year}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="text-yellow-600 hover:text-yellow-700">
                          Preberi več →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {!isDataLoaded ? null : filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Ni projektov v tej kategoriji.</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 ">
          <div className="container sm:w-[80%] mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">{t('whyChooseUs.title')}</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-black" />
                </div>
                <h3 className="mb-2">{t('whyChooseUs.certificates.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('whyChooseUs.certificates.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2">{t('whyChooseUs.speed.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('whyChooseUs.speed.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2">{t('whyChooseUs.warranty.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('whyChooseUs.warranty.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2">{t('whyChooseUs.support.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('whyChooseUs.support.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="vprasanja" className="py-20 bg-[#f5f5f7]">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="mb-4">{t('faq.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('faq.subtitle')}
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {!isDataLoaded ? (
                // Loading skeleton for FAQ
                Array.from({ length: 5 }).map((_, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                faqs.filter(faq => faq.language === language).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontakt" className="py-20 ">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-4">{t('contact.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h3 className="mb-6">{t("contact.info")}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-yellow-500 mt-1" />
                    <div>
                      <p>{t("contact.phone")}</p>
                      <p className="text-lg">+386 40 123 456</p>
                      <p className="text-sm text-muted-foreground">{t('contact.contactInfo.phone.note')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-yellow-500 mt-1" />
                    <div>
                      <p>{t("contact.email")}</p>
                      <p className="text-lg">info@voltage-elektro.si</p>
                      <p className="text-sm text-muted-foreground">{t("contact.contactInfo.email.note")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-yellow-500 mt-1" />
                    <div>
                      <p>{t("contact.area")}</p>
                      <p className="text-lg">{t("contact.area_value")}</p>
                      <p className="text-sm text-muted-foreground">{t("contact.area_note")}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="mb-2">{t("contact.emergency")}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t("contact.emergency_desc")}
                  </p>
                  <Badge variant="secondary" className="bg-yellow-500 text-black">
                    {t("common.24h_available")}
                  </Badge>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="mb-6">{t("contact.form.title")}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="mt-2 bg-[#f5f5f7]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t("contact.contactInfo.email.label")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="mt-2 bg-[#f5f5f7]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="mt-2 bg-[#f5f5f7]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      className="mt-2 bg-[#f5f5f7]"
                      rows={4}
                      placeholder={t("contact.form.placeholder")}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Mail className="mr-2 h-4 w-4" />
                    {t("contact.form.title")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12  " >
          <div className="container sm:w-[80%] mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                <img src={logoPath} alt="Voltage Logo" className="h-16 w-auto brightness-0 invert" />
                </div>
                <p className="text-sm opacity-80 mb-4">
                  {t("footer.description")}
                </p>
                <Badge variant="secondary" className="bg-yellow-500 text-black">
                  {t("footer.certified")}
                </Badge>
              </div>
              
              <div>
                <h4 className="mb-4">{t("footer.services")}</h4>
                <ul className="space-y-2 text-sm opacity-80">
                  {services.slice(0, 6).map((service) => (
                    <li key={service.id}>{service.title}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="mb-4">{t("footer.contact")}</h4>
                <div className="space-y-2 text-sm opacity-80">
                  <p>📞 +386 40 123 456</p>
                  <p>✉️ info@voltage-elektro.si</p>
                  <p>📍 {t("contact.contactInfo.area.location")}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
              <p>{t("footer.copyright")}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
