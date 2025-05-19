"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coins, User, Building2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  
  const userTypes = [
    {
      id: "student",
      title: "Aluno",
      description: "Receba moedas por mérito e troque por vantagens",
      icon: <GraduationCap className="h-12 w-12 text-primary" />,
      path: "/register/student"
    },
    {
      id: "company",
      title: "Empresa",
      description: "Ofereça vantagens e atraia talentos acadêmicos",
      icon: <Building2 className="h-12 w-12 text-primary" />,
      path: "/register/company"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Link href="/" className="flex items-center space-x-2">
            <Coins className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Moeda Estudantil</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">Crie sua conta</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o tipo de conta que deseja criar para começar a usar o sistema de moeda estudantil
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {userTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="rounded-full bg-primary/10 p-4 w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                  {type.icon}
                </div>
                <h2 className="text-2xl font-bold mb-3 text-center">{type.title}</h2>
                <p className="text-gray-600 text-center mb-8">
                  {type.description}
                </p>
                <Button
                  onClick={() => router.push(type.path)}
                  className="w-full"
                >
                  Cadastrar como {type.title}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12 text-gray-600"
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