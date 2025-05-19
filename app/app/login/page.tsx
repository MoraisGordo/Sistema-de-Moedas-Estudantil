"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coins, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Falha no login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center mb-8">
            <Coins className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Moeda Estudantil</h1>
          </div>
          
          <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta</h2>
          <p className="text-gray-600 mb-8">
            Entre com suas credenciais para acessar sua conta
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
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
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <p className="text-center mt-8 text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
        </motion.div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-primary/10 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center p-12"
        >
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
            {"https://www.shutterstock.com/image-illustration/text-caption-presenting-smart-contract-260nw-2090823904.jpg"}
          </div>
        </motion.div>
      </div>
    </div>
  );
}