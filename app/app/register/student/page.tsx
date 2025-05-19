"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coins, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";

export default function StudentRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    rg: "",
    address: "",
    institutionId: "",
    course: "",
    password: "",
    confirmPassword: "",
  });

  // Mock institutions data (in a real app, this would come from an API)
  const institutions = [
    { id: "1", name: "Universidade Federal" },
    { id: "2", name: "Universidade Estadual" },
    { id: "3", name: "Faculdade Particular" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    if (!formData.name || !formData.email || !formData.cpf || !formData.password) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role: "STUDENT",
        }),
      });

      if (!response.ok) {
        throw new Error("Falha no cadastro");
      }

      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Falha no cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <Link href="/register" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Voltar</span>
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <Coins className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Moeda Estudantil</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Aluno</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rg">RG</Label>
                <Input
                  id="rg"
                  name="rg"
                  value={formData.rg}
                  onChange={handleChange}
                  placeholder="00.000.000-0"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, número, bairro, cidade, estado"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institutionId">Instituição de Ensino *</Label>
                <Select
                  value={formData.institutionId}
                  onValueChange={(value) => handleSelectChange("institutionId", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua instituição" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course">Curso *</Label>
                <Input
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Nome do seu curso"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </div>
          </form>
          
          <p className="text-center mt-6 text-gray-600 text-sm">
            Campos marcados com * são obrigatórios
          </p>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 text-gray-600"
        >
          Já tem uma conta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Faça login
          </Link>
        </motion.p>
      </div>
    </div>
  );
}