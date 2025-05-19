"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coins, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function CompanyRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnpj: "",
    description: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    if (!formData.name || !formData.email || !formData.cnpj || !formData.password) {
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
          role: "COMPANY",
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
          <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Empresa Parceira</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Empresa *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Corporativo *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contato@empresa.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  placeholder="00.000.000/0001-00"
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descrição da Empresa</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descreva sua empresa, produtos e serviços"
                  rows={4}
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
          
          <div className="mt-8 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-2">Após o cadastro:</h3>
            <p className="text-sm text-gray-600">
              Você poderá cadastrar vantagens e produtos que serão oferecidos aos alunos em troca de moedas virtuais. Quanto mais atrativas forem suas ofertas, mais alunos poderão resgatá-las!
            </p>
          </div>
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