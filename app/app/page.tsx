"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Award, BookOpen, Building2, Coins, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "company">("student");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Coins className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Moeda Estudantil</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Funcionalidades</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">Como Funciona</a>
              <a href="#benefits" className="text-gray-600 hover:text-primary transition-colors">Benefícios</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-outline">
                Entrar
              </Link>
              <Link href="/register" className="btn-primary">
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Reconhecimento de Mérito com <span className="text-primary">Moeda Virtual</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Uma plataforma que permite professores reconhecerem o mérito estudantil através de moedas virtuais, que podem ser trocadas por vantagens reais.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => router.push('/register')}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <span>Começar Agora</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="btn-outline"
                >
                  Já tenho uma conta
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <Coins className="h-16 w-16 text-primary/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Funcionalidades Principais</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma oferece um sistema completo para reconhecimento de mérito estudantil
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} className="card">
              <div className="rounded-full bg-primary/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Distribuição de Moedas</h3>
              <p className="text-gray-600">
                Professores recebem moedas virtuais para distribuir aos alunos como reconhecimento de mérito.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="card">
              <div className="rounded-full bg-primary/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Vantagens Exclusivas</h3>
              <p className="text-gray-600">
                Alunos podem trocar moedas por vantagens oferecidas por empresas parceiras.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="card">
              <div className="rounded-full bg-primary/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Parcerias Empresariais</h3>
              <p className="text-gray-600">
                Empresas podem oferecer produtos e serviços como vantagens para os alunos.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Escolha seu perfil e veja como a plataforma funciona para você
            </p>
          </motion.div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab("student")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === "student"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Alunos
              </button>
              <button
                onClick={() => setActiveTab("teacher")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "teacher"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Professores
              </button>
              <button
                onClick={() => setActiveTab("company")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === "company"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Empresas
              </button>
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {activeTab === "student" && (
              <>
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">Para Alunos</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">1</div>
                      <p>Cadastre-se com seus dados pessoais e instituição de ensino</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">2</div>
                      <p>Receba moedas virtuais como reconhecimento de mérito dos professores</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">3</div>
                      <p>Visualize seu saldo e histórico de transações</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">4</div>
                      <p>Troque suas moedas por vantagens oferecidas pelas empresas parceiras</p>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <GraduationCap className="h-16 w-16 text-primary/50" />
                  </div>
                </div>
              </>
            )}

            {activeTab === "teacher" && (
              <>
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">Para Professores</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">1</div>
                      <p>Acesse a plataforma com as credenciais fornecidas pela sua instituição</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">2</div>
                      <p>Receba 1.000 moedas virtuais por semestre para distribuir</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">3</div>
                      <p>Envie moedas para alunos como reconhecimento de mérito</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">4</div>
                      <p>Acompanhe seu saldo e histórico de distribuição</p>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/50" />
                  </div>
                </div>
              </>
            )}

            {activeTab === "company" && (
              <>
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4">Para Empresas</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">1</div>
                      <p>Cadastre sua empresa com CNPJ e informações de contato</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">2</div>
                      <p>Ofereça produtos e serviços como vantagens para os alunos</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">3</div>
                      <p>Defina o valor em moedas virtuais para cada vantagem</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">4</div>
                      <p>Receba notificações quando alunos resgatarem suas vantagens</p>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-primary/50" />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Benefícios para Todos</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma traz vantagens para todos os envolvidos
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} className="card">
              <div className="rounded-full bg-primary/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Para Alunos</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Reconhecimento do mérito acadêmico</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Acesso a vantagens exclusivas</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Motivação para melhor desempenho</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Aproximação com empresas parceiras</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="card">
              <div className="rounded-full bg-primary/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Para Professores</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Ferramenta de incentivo aos alunos</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Reconhecimento de esforços e talentos</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Melhoria do engajamento em sala</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Acompanhamento do desempenho</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="card">
              <div className="rounded-full bg-primary/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Para Empresas</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Visibilidade entre estudantes</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Captação de novos clientes</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Responsabilidade social</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                  <span>Conexão com talentos acadêmicos</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Pronto para começar?</h2>
                <p className="text-white/90 mb-6">
                  Junte-se à nossa plataforma e faça parte desse ecossistema de reconhecimento e recompensas.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => router.push('/register')}
                    className="bg-white text-primary hover:bg-gray-100 transition-colors duration-300 rounded-md px-6 py-3 font-medium"
                  >
                    Criar Conta
                  </button>
                  <button 
                    onClick={() => router.push('/login')}
                    className="bg-transparent border border-white text-white hover:bg-white/10 transition-colors duration-300 rounded-md px-6 py-3 font-medium"
                  >
                    Entrar
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative w-48 h-48"
                >
                  <Coins className="absolute inset-0 w-full h-full text-white/20" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Coins className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Moeda Estudantil</span>
              </div>
              <p className="text-gray-400">
                Plataforma de reconhecimento de mérito estudantil com moeda virtual.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Início</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-primary transition-colors">Funcionalidades</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-primary transition-colors">Como Funciona</a></li>
                <li><a href="#benefits" className="text-gray-400 hover:text-primary transition-colors">Benefícios</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Suporte</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">contato@moedaestudantil.com.br</li>
                <li className="text-gray-400">(11) 9999-9999</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Moeda Estudantil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}