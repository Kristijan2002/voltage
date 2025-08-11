import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Plus, Edit, Trash2, Save, X, ArrowLeft, 
  Settings, Camera, Users, Lock, Calendar, 
  User, Award, Target, Phone, Mail, MapPin 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';
import { servicesAPI, projectsAPI, faqsAPI, testFirebaseConnection, populateSampleData } from '../lib/firebase-services';
import { Service, Project, FAQ, EditingFAQ } from '../types/data';
import { useLanguage } from '../components/LanguageProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Types are now imported from '../types/data'

// Initial data - same as in index.tsx
const initialServices: Service[] = [];

const initialProjects: Project[] = [];

const initialFaqs: FAQ[] = [];

export default function Admin() {
  const logoPath = '/logo.png';

  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { t, language } = useLanguage();
  // State for content management - initialize with initial data to prevent loss
  const [services, setServices] = useState<Service[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  
  // State for editing
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingFaq, setEditingFaq] = useState<EditingFAQ | null>(null);
  
  // State for new items
  const [newService, setNewService] = useState<Partial<Service>>({});
  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [newFaq, setNewFaq] = useState<Partial<FAQ>>({});
  
  // State for UI
  const [activeTab, setActiveTab] = useState('services');
  const [isAddingService, setIsAddingService] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication and load data
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace('/voltageLoginSecretRouteDoNotShare');
        return;
      }
      
      // User is authenticated, load data from Firebase
      const loadData = async () => {
        try {
          setIsLoading(true);
          console.log('Loading data from Firebase...');
          
          // Test Firebase connection first
          const connectionTest = await testFirebaseConnection();
          if (!connectionTest) {
            throw new Error('Firebase connection test failed');
          }
          
          const [servicesData, projectsData, faqsData] = await Promise.all([
            servicesAPI.getAll(),
            projectsAPI.getAll(),
            faqsAPI.getAll()
          ]);
          
          console.log('Data loaded successfully:', { services: servicesData.length, projects: projectsData.length, faqs: faqsData.length });
          
          setServices(servicesData.length > 0 ? servicesData : initialServices);
          setPortfolioProjects(projectsData.length > 0 ? projectsData : initialProjects);
          setFaqs(faqsData.length > 0 ? faqsData : initialFaqs);
        } catch (error: any) {
          console.error('Error loading data from Firebase:', error);
          
          // Show user-friendly error message
          if (error.message.includes('Permission denied')) {
            alert(t('admin.common.firebasePermissionError').replace('{message}', error.message));
          } else {
            alert(t('admin.common.usingInitialData'));
          }
          
          // Use initial data as fallback
          setServices(initialServices);
          setPortfolioProjects(initialProjects);
          setFaqs(initialFaqs);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    }
  }, [authLoading, user, router, t]);

  // Service handlers
  const handleAddService = async () => {
    if (newService.title && newService.description) {
      try {
        const serviceData = {
          language: language,
          title: newService.title,
          description: newService.description,
          shortDescription: newService.shortDescription || '',
          details: newService.details || '',
          icon: newService.icon || '⚡',
          price: newService.price || '',
          warranty: newService.warranty || '',
          duration: newService.duration || '',
          materials: newService.materials || [],
          brands: newService.brands || [],
          process: newService.process || [],
          included: newService.included || []
        };
        
        const newId = await servicesAPI.add(serviceData);
        const newServiceWithId = { ...serviceData, id: newId };
        setServices([newServiceWithId, ...services]);
        setNewService({});
        setIsAddingService(false);
      } catch (error) {
        console.error('Error adding service:', error);
        alert(t('admin.services.errorAdding'));
      }
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
  };

  const handleSaveService = async () => {
    if (editingService) {
      try {
        await servicesAPI.update(editingService.id, editingService);
        setServices(services.map(s => s.id === editingService.id ? editingService : s));
        setEditingService(null);
      } catch (error) {
        console.error('Error updating service:', error);
        alert(t('admin.services.errorUpdating'));
      }
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (confirm(t('admin.services.deleteConfirm'))) {
      try {
        await servicesAPI.delete(serviceId);
        setServices(services.filter(s => s.id !== serviceId));
      } catch (error) {
        console.error('Error deleting service:', error);
        alert(t('admin.services.errorDeleting'));
      }
    }
  };

  // Project handlers
  const handleAddProject = async () => {
    if (newProject.title && newProject.description) {
      try {
        const projectData = {
          language: language,
          title: newProject.title,
          category: newProject.category || 'nove-instalacije',
          description: newProject.description,
          shortDescription: newProject.shortDescription || '',
          image: newProject.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          details: newProject.details || '',
          fullDescription: newProject.fullDescription || '',
          client: newProject.client || '',
          location: newProject.location || '',
          year: newProject.year || '',
          duration: newProject.duration || '',
          budget: newProject.budget || '',
          technologies: newProject.technologies || [],
          challenges: newProject.challenges || [],
          solutions: newProject.solutions || [],
          results: newProject.results || [],
          images: newProject.images || [],
          testimonial: newProject.testimonial || {}
        };
        
        const newId = await projectsAPI.add(projectData);
        const newProjectWithId = { ...projectData, id: newId };
        setPortfolioProjects([newProjectWithId, ...portfolioProjects]);
        setNewProject({});
        setIsAddingProject(false);
      } catch (error) {
        console.error('Error adding project:', error);
        alert(t('admin.projects.errorAdding'));
      }
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleSaveProject = async () => {
    if (editingProject) {
      try {
        await projectsAPI.update(editingProject.id, editingProject);
        setPortfolioProjects(portfolioProjects.map(p => p.id === editingProject.id ? editingProject : p));
        setEditingProject(null);
      } catch (error) {
        console.error('Error updating project:', error);
        alert(t('admin.projects.errorUpdating'));
      }
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm(t('admin.projects.deleteConfirm'))) {
      try {
        await projectsAPI.delete(projectId);
        setPortfolioProjects(portfolioProjects.filter(p => p.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert(t('admin.projects.errorDeleting'));
      }
    }
  };

  // FAQ handlers
  const handleAddFaq = async () => {
    if (newFaq.question && newFaq.answer) {
      try {
        const faqData = {
          language: language,
          question: newFaq.question,
          answer: newFaq.answer
        };
        
        const newId = await faqsAPI.add(faqData);
        const newFaqWithId = { ...faqData, id: newId };
        setFaqs([newFaqWithId, ...faqs]);
        setNewFaq({});
        setIsAddingFaq(false);
      } catch (error) {
        console.error('Error adding FAQ:', error);
        alert(t('admin.faqs.errorAdding'));
      }
    }
  };

  const handleEditFaq = (faq: FAQ, index: number) => {
    setEditingFaq({ ...faq, index });
  };

  const handleSaveFaq = async () => {
    if (editingFaq && editingFaq.index !== undefined) {
      try {
        await faqsAPI.update(editingFaq.id, {
          question: editingFaq.question,
          answer: editingFaq.answer
        });
        
        const updatedFaqs = [...faqs];
        updatedFaqs[editingFaq.index] = { 
          language: language,
          id: editingFaq.id,
          question: editingFaq.question, 
          answer: editingFaq.answer 
        };
        setFaqs(updatedFaqs);
        setEditingFaq(null);
      } catch (error) {
        console.error('Error updating FAQ:', error);
        alert(t('admin.faqs.errorUpdating'));
      }
    }
  };

  const handleDeleteFaq = async (faqId: string) => {
    if (confirm(t('admin.faqs.deleteConfirm'))) {
      try {
        await faqsAPI.delete(faqId);
        setFaqs(faqs.filter(f => f.id !== faqId));
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        alert(t('admin.faqs.errorDeleting'));
      }
    }
  };

  const handleLogout = () => {
    signOut();
    router.push('/voltageLoginSecretRouteDoNotShare');
  };

  const resetToInitialData = () => {
    if (confirm(t('admin.common.resetConfirm'))) {
      // Clear localStorage
      localStorage.removeItem('voltage-services');
      localStorage.removeItem('voltage-projects');
      localStorage.removeItem('voltage-faqs');
      
      // Reset states to initial data
      setServices(initialServices);
      setPortfolioProjects(initialProjects);
      setFaqs(initialFaqs);
      
      // Clear editing states
      setEditingService(null);
      setEditingProject(null);
      setEditingFaq(null);
      
      // Clear new item states
      setNewService({});
      setNewProject({});
      setNewFaq({});
      
      // Close add forms
      setIsAddingService(false);
      setIsAddingProject(false);
      setIsAddingFaq(false);
    }
  };

  const handlePopulateSampleData = async () => {
    if (confirm('Ali želite dodati vzorčne podatke v bazo? To bo dodalo vzorčne storitve in projekte.')) {
      try {
        await populateSampleData();
        alert('Vzorčni podatki so bili uspešno dodani!');
        
        // Reload data from Firebase
        const [servicesData, projectsData, faqsData] = await Promise.all([
          servicesAPI.getAll(),
          projectsAPI.getAll(),
          faqsAPI.getAll()
        ]);
        
        setServices(servicesData);
        setPortfolioProjects(projectsData);
        setFaqs(faqsData);
      } catch (error: any) {
        console.error('Error populating sample data:', error);
        alert('Napaka pri dodajanju vzorčnih podatkov: ' + error.message);
      }
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                           <p className="text-lg text-muted-foreground">{t('admin.common.checkingAccess')}</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    // Force redirect to login
    if (typeof window !== 'undefined') {
      router.replace('/voltageLoginSecretRouteDoNotShare');
    }
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
                     <p className="text-lg text-muted-foreground">{t('admin.common.redirectingToLogin')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Voltage Elektroinštalacije</title>
        <meta name="description" content="Admin panel za upravljanje vsebine Voltage Elektroinštacije" />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('admin.backToSite')}
              </Button>
            <img src={logoPath} alt="Logo" className="h-20" />
              {/* <div className="text-2xl font-bold text-primary">{t('admin.title')}</div> */}
            </div>
            <div className="flex items-center space-x-4">
              
              <Button 
                variant="outline" 
                onClick={handlePopulateSampleData}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Plus className="mr-2 h-4 w-4" />
                Dodaj vzorčne podatke
              </Button>
              
              <Button 
                variant="outline" 
                onClick={resetToInitialData}
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                <Settings className="mr-2 h-4 w-4" />
                {t('admin.resetData')}
              </Button>
              <Badge variant="secondary" className="bg-yellow-500 text-black">
                {t('admin.administration')}
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Lock className="mr-2 h-4 w-4" />
                {t('admin.logout')}
              </Button>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">{t('admin.tabs.services')}</TabsTrigger>
              <TabsTrigger value="projects">{t('admin.tabs.projects')}</TabsTrigger>
              <TabsTrigger value="faqs">{t('admin.tabs.faqs')}</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('admin.services.title')}</h2>
                <Button 
                  onClick={() => setIsAddingService(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t('admin.services.addService')}
                </Button>
              </div>

              {/* Add New Service Form */}
              {isAddingService && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.services.newService')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="service-title">{t('admin.services.serviceTitle')}</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="service-title"
                          value={newService.title || ''}
                          onChange={(e) => setNewService({...newService, title: e.target.value})}
                          placeholder={t('admin.services.serviceTitle')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-icon">{t('admin.services.serviceIcon')}</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="service-icon"
                          value={newService.icon || ''}
                          onChange={(e) => setNewService({...newService, icon: e.target.value})}
                          placeholder="⚡"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="service-description">{t('admin.services.serviceDescription')}</Label>
                      <Input
                       className="bg-[#f5f5f7]"
                        id="service-description"
                        value={newService.description || ''}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                        placeholder={t('admin.services.serviceDescription')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-shortDescription">{t('admin.services.serviceShortDescription')}</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="service-shortDescription"
                        value={newService.shortDescription || ''}
                        onChange={(e) => setNewService({...newService, shortDescription: e.target.value})}
                        placeholder={t('admin.services.serviceShortDescription')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-details">{t('admin.services.serviceDetails')}</Label>
                      <Textarea
                        className="bg-[#f5f5f7]"
                        id="service-description"
                        value={newService.details || ''}
                        onChange={(e) => setNewService({...newService, details: e.target.value})}
                        placeholder={t('admin.services.serviceDetails')}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="service-price">{t('admin.services.servicePrice')}</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="service-price"
                          value={newService.price || ''}
                          onChange={(e) => setNewService({...newService, price: e.target.value})}
                          placeholder="Od 25€/ura"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-warranty">{t('admin.services.serviceWarranty')}</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="service-warranty"
                          value={newService.warranty || ''}
                          onChange={(e) => setNewService({...newService, warranty: e.target.value})}
                          placeholder="2 leti"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-duration">{t('admin.services.serviceDuration')}</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="service-duration"
                          value={newService.duration || ''}
                          onChange={(e) => setNewService({...newService, duration: e.target.value})}
                          placeholder="1-2 uri"
                        />
                      </div>
                    </div>
                    
                    {/* Materials Array */}
                    <div>
                      <Label htmlFor="service-materials">{t('admin.services.serviceMaterials')}</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="service-materials"
                        value={newService.materials?.join(', ') || ''}
                        onChange={(e) => setNewService({
                          ...newService, 
                          materials: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="Material 1, Material 2, Material 3"
                      />
                    </div>
                    
                    {/* Brands Array */}
                    <div>
                      <Label htmlFor="service-brands">{t('admin.services.serviceBrands')}</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="service-brands"
                        value={newService.brands?.join(', ') || ''}
                        onChange={(e) => setNewService({
                          ...newService, 
                          brands: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="ABB, Schneider, Hager"
                      />
                    </div>
                    
                    {/* Process Array */}
                    <div>
                      <Label htmlFor="service-process">{t('admin.services.serviceProcess')}</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="service-process"
                        value={newService.process?.join(', ') || ''}
                        onChange={(e) => setNewService({
                          ...newService, 
                          process: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="Korak 1, Korak 2, Korak 3"
                      />
                    </div>
                    
                    {/* Included Array */}
                    <div>
                      <Label htmlFor="service-included">{t('admin.services.serviceIncluded')}</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="service-included"
                        value={newService.included?.join(', ') || ''}
                        onChange={(e) => setNewService({
                          ...newService, 
                          included: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="Storitev 1, Storitev 2, Storitev 3"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={handleAddService} className="bg-green-600 hover:bg-green-700">
                        <Save className="mr-2 h-4 w-4" />
                        {t('admin.services.addServiceButton')}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddingService(false);
                          setNewService({});
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        {t('admin.services.cancel')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Services List */}
              <div className="grid gap-4">
                {services.filter(service => service.language === language).map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      {editingService?.id === service.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Naslov</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingService.title}
                                onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Ikona</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingService.icon}
                                onChange={(e) => setEditingService({...editingService, icon: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Opis</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingService.description}
                              onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Kratek opis</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingService.shortDescription}
                              onChange={(e) => setEditingService({...editingService, shortDescription: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Podrobnosti</Label>
                            <Textarea
                              className="bg-[#f5f5f7]"
                              value={editingService.details}
                              onChange={(e) => setEditingService({...editingService, details: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label>Cena</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingService.price}
                                onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Garancija</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingService.warranty}
                                onChange={(e) => setEditingService({...editingService, warranty: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Trajanje</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingService.duration}
                                onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          {/* Materials Array */}
                          <div>
                            <Label>Materiali (ločeni z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingService.materials?.join(', ') || ''}
                              onChange={(e) => setEditingService({
                                ...editingService, 
                                materials: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="Material 1, Material 2, Material 3"
                            />
                          </div>
                          
                          {/* Brands Array */}
                          <div>
                            <Label>Blagovne znamke (ločene z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingService.brands?.join(', ') || ''}
                              onChange={(e) => setEditingService({
                                ...editingService, 
                                brands: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="ABB, Schneider, Hager"
                            />
                          </div>
                          
                          {/* Process Array */}
                          <div>
                            <Label>Postopek (ločen z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingService.process?.join(', ') || ''}
                              onChange={(e) => setEditingService({
                                ...editingService, 
                                process: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="Korak 1, Korak 2, Korak 3"
                            />
                          </div>
                          
                          {/* Included Array */}
                          <div>
                            <Label>Vključeno (ločeno z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingService.included?.join(', ') || ''}
                              onChange={(e) => setEditingService({
                                ...editingService, 
                                included: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="Storitev 1, Storitev 2, Storitev 3"
                            />
                          </div>
                          
                          <div className="flex gap-2">
                            <Button onClick={handleSaveService} className="bg-green-600 hover:bg-green-700">
                              <Save className="mr-2 h-4 w-4" />
                              Shrani
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setEditingService(null)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Prekliči
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl">{service.icon}</span>
                            <div>
                              <h3 className="font-semibold">{service.title}</h3>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                <span>💰 {service.price}</span>
                                <span>⏱️ {service.duration}</span>
                                <span>🛡️ {service.warranty}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditService(service)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteService(service.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('admin.projects.title')}</h2>
                <Button 
                  onClick={() => setIsAddingProject(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t('admin.projects.addProject')}
                </Button>
              </div>

              {/* Add New Project Form */}
              {isAddingProject && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.projects.newProject')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-title">{t('admin.projects.projectTitle')}</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="project-title"
                          value={newProject.title || ''}
                          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                          placeholder="Naziv projekta"
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-category">{t('admin.projects.projectCategory')}</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="project-category"
                          value={newProject.category || ''}
                          onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                          placeholder="nove-instalacije"
                        />
                      </div>
                    </div>
                    <div>
                                              <Label htmlFor="project-description">{t('admin.projects.projectDescription')}</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="project-description"
                        value={newProject.description || ''}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        placeholder={t('admin.projects.projectShortDescription')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-shortDescription">{t('admin.projects.projectShortDescription')}</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="project-shortDescription"
                        value={newProject.shortDescription || ''}
                        onChange={(e) => setNewProject({...newProject, shortDescription: e.target.value})}
                        placeholder={t('admin.projects.projectShortDescription')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-fullDescription">{t('admin.projects.projectFullDescription')}</Label>
                      <Textarea
                        className="bg-[#f5f5f7]"
                        id="project-fullDescription"
                        value={newProject.fullDescription || ''}
                        onChange={(e) => setNewProject({...newProject, fullDescription: e.target.value})}
                        placeholder={t('admin.projects.projectFullDescription')}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-image">{t('admin.projects.projectImage')}</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="project-image"
                        value={newProject.image || ''}
                        onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-client">{t('admin.projects.projectClient')}</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="project-client"
                          value={newProject.client || ''}
                          onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                          placeholder="Ime stranke"
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-location">Lokacija</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="project-location"
                          value={newProject.location || ''}
                          onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                          placeholder="Ljubljana"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="project-year">Leto</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="project-year"
                          value={newProject.year || ''}
                          onChange={(e) => setNewProject({...newProject, year: e.target.value})}
                          placeholder="2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-duration">Trajanje</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="project-duration"
                          value={newProject.duration || ''}
                          onChange={(e) => setNewProject({...newProject, duration: e.target.value})}
                          placeholder="7 dni"
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-budget">Proračun</Label>
                        <Input
                          className="bg-[#f5f5f7]"
                          id="project-budget"
                          value={newProject.budget || ''}
                          onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                          placeholder="15.000€"
                        />
                      </div>
                    </div>
                    
                    {/* Technologies Array */}
                    <div>
                      <Label htmlFor="project-technologies">Tehnologije (ločene z vejico)</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="project-technologies"
                        value={newProject.technologies?.join(', ') || ''}
                        onChange={(e) => setNewProject({
                          ...newProject, 
                          technologies: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="ABB pametni sistemi, LED razsvetljava, KNX avtomatizacija"
                      />
                    </div>
                    
                    {/* Challenges Array */}
                    <div>
                      <Label htmlFor="project-challenges">Izzivi (ločeni z vejico)</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="project-challenges"
                        value={newProject.challenges?.join(', ') || ''}
                        onChange={(e) => setNewProject({
                          ...newProject, 
                          challenges: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="Izziv 1, Izziv 2, Izziv 3"
                      />
                    </div>
                    
                    {/* Solutions Array */}
                    <div>
                      <Label htmlFor="project-solutions">Rešitve (ločene z vejico)</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="project-solutions"
                        value={newProject.solutions?.join(', ') || ''}
                        onChange={(e) => setNewProject({
                          ...newProject, 
                          solutions: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="Rešitev 1, Rešitev 2, Rešitev 3"
                      />
                    </div>
                    
                    {/* Results Array */}
                    <div>
                      <Label htmlFor="project-results">Rezultati (ločeni z vejico)</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="project-results"
                        value={newProject.results?.join(', ') || ''}
                        onChange={(e) => setNewProject({
                          ...newProject, 
                          results: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="Rezultat 1, Rezultat 2, Rezultat 3"
                      />
                    </div>
                    
                    {/* Images Array */}
                    <div>
                      <Label htmlFor="project-images">URL slik (ločeni z vejico)</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="project-images"
                        value={newProject.images?.join(', ') || ''}
                        onChange={(e) => setNewProject({
                          ...newProject, 
                          images: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                        })}
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      />
                    </div>
                    
                    {/* Testimonial */}
                    <div className="border-t pt-4">
                      <Label className="text-lg font-semibold">Mnenje stranke</Label>
                      <div className="grid grid-cols-1 gap-4 mt-2">
                        <div>
                          <Label htmlFor="project-testimonial-text">Besedilo mnenja</Label>
                          <Textarea
                            className="bg-[#f5f5f7]"
                            id="project-testimonial-text"
                            value={newProject.testimonial?.text || ''}
                            onChange={(e) => setNewProject({
                              ...newProject, 
                              testimonial: { ...newProject.testimonial, text: e.target.value }
                            })}
                            placeholder="Mnenje stranke o projektu..."
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="project-testimonial-author">Avtor mnenja</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              id="project-testimonial-author"
                              value={newProject.testimonial?.author || ''}
                              onChange={(e) => setNewProject({
                                ...newProject, 
                                testimonial: { ...newProject.testimonial, author: e.target.value }
                              })}
                              placeholder="Ime in priimek"
                            />
                          </div>
                          <div>
                            <Label htmlFor="project-testimonial-position">Pozicija</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              id="project-testimonial-position"
                              value={newProject.testimonial?.position || ''}
                              onChange={(e) => setNewProject({
                                ...newProject, 
                                testimonial: { ...newProject.testimonial, position: e.target.value }
                              })}
                              placeholder="Direktor, Lastnik..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={handleAddProject} className="bg-green-600 hover:bg-green-700">
                        <Save className="mr-2 h-4 w-4" />
                        Dodaj projekt
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddingProject(false);
                          setNewProject({});
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Prekliči
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Projects List */}
              <div className="grid gap-4">
                {portfolioProjects.filter(project => project.language === language).map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      {editingProject?.id === project.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Naslov</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingProject.title}
                                onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Kategorija</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingProject.category}
                                onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Opis</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingProject.description}
                              onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Kratek opis</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingProject.shortDescription}
                              onChange={(e) => setEditingProject({...editingProject, shortDescription: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Podrobni opis</Label>
                            <Textarea
                              className="bg-[#f5f5f7]"
                              value={editingProject.fullDescription}
                              onChange={(e) => setEditingProject({...editingProject, fullDescription: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>URL glavne slike</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingProject.image}
                              onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Stranka</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingProject.client}
                                onChange={(e) => setEditingProject({...editingProject, client: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Lokacija</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingProject.location}
                                onChange={(e) => setEditingProject({...editingProject, location: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label>Leto</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingProject.year}
                                onChange={(e) => setEditingProject({...editingProject, year: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Trajanje</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingProject.duration}
                                onChange={(e) => setEditingProject({...editingProject, duration: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>Proračun</Label>
                              <Input
                                className="bg-[#f5f5f7]"
                                value={editingProject.budget}
                                onChange={(e) => setEditingProject({...editingProject, budget: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          {/* Technologies Array */}
                          <div>
                            <Label>Tehnologije (ločene z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingProject.technologies?.join(', ') || ''}
                              onChange={(e) => setEditingProject({
                                ...editingProject, 
                                technologies: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="ABB pametni sistemi, LED razsvetljava, KNX avtomatizacija"
                            />
                          </div>
                          
                          {/* Challenges Array */}
                          <div>
                            <Label>Izzivi (ločeni z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingProject.challenges?.join(', ') || ''}
                              onChange={(e) => setEditingProject({
                                ...editingProject, 
                                challenges: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="Izziv 1, Izziv 2, Izziv 3"
                            />
                          </div>
                          
                          {/* Solutions Array */}
                          <div>
                            <Label>Rešitve (ločene z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingProject.solutions?.join(', ') || ''}
                              onChange={(e) => setEditingProject({
                                ...editingProject, 
                                solutions: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="Rešitev 1, Rešitev 2, Rešitev 3"
                            />
                          </div>
                          
                          {/* Results Array */}
                          <div>
                            <Label>Rezultati (ločeni z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingProject.results?.join(', ') || ''}
                              onChange={(e) => setEditingProject({
                                ...editingProject, 
                                results: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="Rezultat 1, Rezultat 2, Rezultat 3"
                            />
                          </div>
                          
                          {/* Images Array */}
                          <div>
                            <Label>URL slik (ločeni z vejico)</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingProject.images?.join(', ') || ''}
                              onChange={(e) => setEditingProject({
                                ...editingProject, 
                                images: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                              })}
                              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            />
                          </div>
                          
                          {/* Testimonial */}
                          <div className="border-t pt-4">
                            <Label className="text-lg font-semibold">Mnenje stranke</Label>
                            <div className="grid grid-cols-1 gap-4 mt-2">
                              <div>
                                <Label>Besedilo mnenja</Label>
                                <Textarea
                                  className="bg-[#f5f5f7]"
                                  value={editingProject.testimonial?.text || ''}
                                  onChange={(e) => setEditingProject({
                                    ...editingProject, 
                                    testimonial: { ...editingProject.testimonial, text: e.target.value }
                                  })}
                                  placeholder="Mnenje stranke o projektu..."
                                  rows={3}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Avtor mnenja</Label>
                                  <Input
                                    className="bg-[#f5f5f7]"
                                    value={editingProject.testimonial?.author || ''}
                                    onChange={(e) => setEditingProject({
                                      ...editingProject, 
                                      testimonial: { ...editingProject.testimonial, author: e.target.value }
                                    })}
                                    placeholder="Ime in priimek"
                                  />
                                </div>
                                <div>
                                  <Label>Pozicija</Label>
                                  <Input
                                    className="bg-[#f5f5f7]"
                                    value={editingProject.testimonial?.position || ''}
                                    placeholder="Direktor, Lastnik..."
                                    onChange={(e) => setEditingProject({
                                      ...editingProject, 
                                      testimonial: { ...editingProject.testimonial, position: e.target.value }
                                    })}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button onClick={handleSaveProject} className="bg-green-600 hover:bg-green-700">
                              <Save className="mr-2 h-4 w-4" />
                              Shrani
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setEditingProject(null)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Prekliči
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h3 className="font-semibold">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                <span>📍 {project.location}</span>
                                <span>📅 {project.year}</span>
                                <span>🏷️ {project.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditProject(project)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faqs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('admin.faqs.title')}</h2>
                <Button 
                  onClick={() => setIsAddingFaq(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj vprašanje
                </Button>
              </div>

              {/* Add New FAQ Form */}
              {isAddingFaq && (
                <Card>
                  <CardHeader>
                    <CardTitle>Novo vprašanje</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="faq-question">Vprašanje</Label>
                      <Input
                        className="bg-[#f5f5f7]"
                        id="faq-question"
                        value={newFaq.question || ''}
                        onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                        placeholder="Vprašanje..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="faq-answer">Odgovor</Label>
                      <Textarea
                        className="bg-[#f5f5f7]"
                        id="faq-answer"
                        value={newFaq.answer || ''}
                        onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                        placeholder="Odgovor..."
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddFaq} className="bg-green-600 hover:bg-green-700">
                        <Save className="mr-2 h-4 w-4" />
                        Dodaj vprašanje
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddingFaq(false);
                          setNewFaq({});
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Prekliči
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* FAQ List */}
              <div className="grid gap-4">
                {faqs.filter(faq => faq.language === language).map((faq, index) => (
                  <Card key={faq.id}>
                    <CardContent className="p-6">
                      {editingFaq?.index === index ? (
                        <div className="space-y-4">
                          <div>
                            <Label>Vprašanje</Label>
                            <Input
                              className="bg-[#f5f5f7]"
                              value={editingFaq.question}
                              onChange={(e) => setEditingFaq({...editingFaq, question: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Odgovor</Label>
                            <Textarea
                              className="bg-[#f5f5f7]"
                              value={editingFaq.answer}
                              onChange={(e) => setEditingFaq({...editingFaq, answer: e.target.value})}
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSaveFaq} className="bg-green-600 hover:bg-green-700">
                              <Save className="mr-2 h-4 w-4" />
                              Shrani
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setEditingFaq(null)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Prekliči
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{faq.question}</h3>
                            <p className="text-sm text-muted-foreground">{faq.answer}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditFaq(faq, index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
