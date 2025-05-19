"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-provider";
import { User, Mail, Phone, Building, MapPin, Lock, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    institution: "",
    course: "",
    department: "",
    description: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call to get user details
    if (user) {
      setFormData({
        ...formData,
        name: user.name || "",
        email: user.email || ""
      });

      if (user.role === "STUDENT") {
        setIsStudent(true);
        setIsTeacher(false);
        setIsCompany(false);
        setFormData(prev => ({
          ...prev,
          institution: "Universidade Federal",
          course: "Engenharia de Software",
          address: "Rua das Flores, 123 - Centro"
        }));
      } else if (user.role === "TEACHER") {
        setIsStudent(false);
        setIsTeacher(true);
        setIsCompany(false);
        setFormData(prev => ({
          ...prev,
          institution: "Universidade Federal",
          department: "Departamento de Computação",
          phone: "(11) 98765-4321"
        }));
      } else if (user.role === "COMPANY") {
        setIsStudent(false);
        setIsTeacher(false);
        setIsCompany(true);
        setFormData(prev => ({
          ...prev,
          description: "Empresa especializada em tecnologia educacional, oferecendo soluções inovadoras para instituições de ensino.",
          address: "Av. Paulista, 1000 - Bela Vista",
          phone: "(11) 3456-7890"
        }));
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    toast.success("Perfil atualizado com sucesso!");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    if (formData.newPassword.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    // In a real app, this would be an API call
    toast.success("Senha atualizada com sucesso!");
    
    // Reset password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold mb-2">Configurações da Conta</h1>
        <p className="text-gray-600">
          Gerencie suas informações pessoais e preferências.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">Informações Pessoais</h3>
            
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="mb-1 block">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="mb-1 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone" className="mb-1 block">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {(isStudent || isCompany) && (
                  <div>
                    <Label htmlFor="address" className="mb-1 block">Endereço</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}
                
                {(isStudent || isTeacher) && (
                  <div>
                    <Label htmlFor="institution" className="mb-1 block">Instituição</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={isTeacher} // Teachers can't change their institution
                      />
                    </div>
                  </div>
                )}
                
                {isStudent && (
                  <div>
                    <Label htmlFor="course" className="mb-1 block">Curso</Label>
                    <Input
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                    />
                  </div>
                )}
                
                {isTeacher && (
                  <div>
                    <Label htmlFor="department" className="mb-1 block">Departamento</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled // Teachers can't change their department
                    />
                  </div>
                )}
              </div>
              
              {isCompany && (
                <div>
                  <Label htmlFor="description" className="mb-1 block">Descrição da Empresa</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              )}
              
              <div className="pt-2">
                <Button type="submit" className="w-full md:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">Alterar Senha</h3>
            
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="currentPassword" className="mb-1 block">Senha Atual</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="newPassword" className="mb-1 block">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword" className="mb-1 block">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full md:w-auto">
                  <Lock className="h-4 w-4 mr-2" />
                  Atualizar Senha
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-6 sticky top-24"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium">{formData.name}</h3>
              <p className="text-gray-500">{user?.role === "STUDENT" ? "Aluno" : user?.role === "TEACHER" ? "Professor" : "Empresa"}</p>
              {(isStudent || isTeacher) && (
                <p className="text-sm text-gray-500 mt-1">{formData.institution}</p>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">{formData.email}</span>
                </div>
                
                {formData.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{formData.phone}</span>
                  </div>
                )}
                
                {formData.address && (
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                    <span className="text-sm">{formData.address}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 mb-1">Dica de Segurança</h4>
                  <p className="text-sm text-blue-600">
                    Mantenha suas informações atualizadas e altere sua senha regularmente para maior segurança.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}