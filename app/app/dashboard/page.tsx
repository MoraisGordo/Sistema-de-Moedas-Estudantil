"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/components/auth-provider";
import { 
  Coins, 
  TrendingUp, 
  Gift, 
  History, 
  Users, 
  Award,
  Building2,
  BookOpen,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

// Define types for our data structures
interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  teacher?: string;
  student?: string;
}

interface Advantage {
  id: number;
  name: string;
  cost: number;
  company?: string;
  redemptions?: number;
  imageUrl: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [studentBalance, setStudentBalance] = useState<number>(0);
  const [teacherBalance, setTeacherBalance] = useState<number>(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [availableAdvantages, setAvailableAdvantages] = useState<Advantage[]>([]);
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Mock data - in a real app, this would come from API calls
  useEffect(() => {
    // Simulate API calls
    if (user?.role === "STUDENT") {
      setStudentBalance(750);
      setRecentTransactions([
        { id: 1, description: "Participação em projeto", amount: 50, date: "2023-06-15", teacher: "Prof. Carlos Silva" },
        { id: 2, description: "Melhor apresentação", amount: 100, date: "2023-06-10", teacher: "Profa. Ana Oliveira" },
        { id: 3, description: "Colaboração em grupo", amount: 30, date: "2023-06-05", teacher: "Prof. Roberto Santos" },
      ]);
      setAvailableAdvantages([
        { id: 1, name: "Desconto em Livraria", cost: 200, company: "Livraria Central", imageUrl: "https://cdn.create.vista.com/downloads/e96ae808-b3f5-4e5a-806c-513b9baf14ae_640.jpeg" },
        { id: 2, name: "Curso Online Premium", cost: 500, company: "EduTech", imageUrl: "https://images.template.net/43643/Online-courses-Certificate-Template880.jpg" },
        { id: 3, name: "Café Grátis por 1 Mês", cost: 300, company: "Café do Campus", imageUrl: "https://i.etsystatic.com/31749485/r/il/1fdf84/3899069817/il_fullxfull.3899069817_lep1.jpg" },
      ]);
    } else if (user?.role === "TEACHER") {
      setTeacherBalance(650);
      setRecentTransactions([
        { id: 1, description: "Participação em projeto", amount: 50, date: "2023-06-15", student: "João Silva" },
        { id: 2, description: "Melhor apresentação", amount: 100, date: "2023-06-10", student: "Maria Oliveira" },
        { id: 3, description: "Colaboração em grupo", amount: 30, date: "2023-06-05", student: "Pedro Santos" },
      ]);
    } else if (user?.role === "COMPANY") {
      setAvailableAdvantages([
        { id: 1, name: "Desconto em Livraria", cost: 200, redemptions: 15, imageUrl: "https://cdn.create.vista.com/downloads/e96ae808-b3f5-4e5a-806c-513b9baf14ae_640.jpeg" },
        { id: 2, name: "Curso Online Premium", cost: 500, redemptions: 8, imageUrl: "https://images.template.net/43643/Online-courses-Certificate-Template880.jpg" },
        { id: 3, name: "Café Grátis por 1 Mês", cost: 300, redemptions: 22, imageUrl: "https://i.etsystatic.com/31749485/r/il/1fdf84/3899069817/il_fullxfull.3899069817_lep1.jpg" },
      ]);
    }
  }, [user]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const renderStudentDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Saldo de Moedas</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Coins className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {studentBalance}
            </motion.span>
            <span className="ml-2 text-gray-500">moedas</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/balance"
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver detalhes
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Vantagens Disponíveis</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Gift className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {availableAdvantages.length}
            </motion.span>
            <span className="ml-2 text-gray-500">vantagens</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/advantages"
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver todas
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Últimas Transações</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <History className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {recentTransactions.length}
            </motion.span>
            <span className="ml-2 text-gray-500">recentes</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/history"
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver histórico
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Últimas Moedas Recebidas</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">De: {transaction.teacher}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
                <div className="flex items-center text-primary font-bold">
                  +{transaction.amount} <Coins className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Vantagens em Destaque</h3>
          <div className="space-y-4">
            {availableAdvantages.map((advantage) => (
              <div key={advantage.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 rounded-md overflow-hidden mr-4 bg-gray-200">
                  {advantage.imageUrl}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{advantage.name}</p>
                  <p className="text-sm text-gray-500">{advantage.company}</p>
                </div>
                <div className="flex items-center text-primary font-bold">
                  {advantage.cost} <Coins className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );

  const renderTeacherDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Saldo de Moedas</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Coins className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {teacherBalance}
            </motion.span>
            <span className="ml-2 text-gray-500">moedas</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/balance"
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver detalhes
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Moedas Distribuídas</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Award className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              350
            </motion.span>
            <span className="ml-2 text-gray-500">moedas</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/history"
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver histórico
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Alunos Premiados</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              12
            </motion.span>
            <span className="ml-2 text-gray-500">alunos</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/send-coins"
              className="text-primary text-sm font-medium hover:underline"
            >
              Enviar moedas
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Últimas Moedas Enviadas</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">Para: {transaction.student}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
                <div className="flex items-center text-primary font-bold">
                  -{transaction.amount} <Coins className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard/send-coins">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <Award className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Enviar Moedas</p>
                <p className="text-xs text-gray-500 mt-1">Reconheça o mérito dos alunos</p>
              </div>
            </Link>
            <Link href="/dashboard/balance">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <Coins className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Ver Saldo</p>
                <p className="text-xs text-gray-500 mt-1">Acompanhe suas moedas</p>
              </div>
            </Link>
            <Link href="/dashboard/history">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <History className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Histórico</p>
                <p className="text-xs text-gray-500 mt-1">Veja suas transações</p>
              </div>
            </Link>
            <Link href="/dashboard/settings">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <Users className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Perfil</p>
                <p className="text-xs text-gray-500 mt-1">Gerencie suas informações</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );

  const renderCompanyDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Vantagens Oferecidas</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Gift className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {availableAdvantages.length}
            </motion.span>
            <span className="ml-2 text-gray-500">vantagens</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/advantages"
              className="text-primary text-sm font-medium hover:underline"
            >
              Gerenciar vantagens
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Total de Resgates</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              45
            </motion.span>
            <span className="ml-2 text-gray-500">resgates</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/redemptions"
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver detalhes
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Alunos Alcançados</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              32
            </motion.span>
            <span className="ml-2 text-gray-500">alunos</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/redemptions"
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver perfil
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Vantagens Mais Resgatadas</h3>
          <div className="space-y-4">
            {availableAdvantages.map((advantage) => (
              <div key={advantage.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 rounded-md overflow-hidden mr-4 bg-gray-200">
                  {advantage.imageUrl}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{advantage.name}</p>
                  <p className="text-sm text-gray-500">{advantage.cost} moedas</p>
                </div>
                <div className="flex items-center text-primary font-bold">
                  {advantage.redemptions} <Users className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard/advantages">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <Gift className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Nova Vantagem</p>
                <p className="text-xs text-gray-500 mt-1">Adicione novas ofertas</p>
              </div>
            </Link>
            <Link href="/dashboard/redemptions">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <History className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Resgates</p>
                <p className="text-xs text-gray-500 mt-1">Veja os cupons resgatados</p>
              </div>
            </Link>
            <Link href="/dashboard/settings">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Perfil da Empresa</p>
                <p className="text-xs text-gray-500 mt-1">Atualize suas informações</p>
              </div>
            </Link>
            <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <p className="font-medium">Estatísticas</p>
              <p className="text-xs text-gray-500 mt-1">Analise o desempenho</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );

  const renderAdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Instituições</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              5
            </motion.span>
            <span className="ml-2 text-gray-500">cadastradas</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/institutions"
              className="text-primary text-sm font-medium hover:underline"
            >
              Gerenciar
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Professores</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              42
            </motion.span>
            <span className="ml-2 text-gray-500">ativos</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/teachers"
              className="text-primary text-sm font-medium hover:underline"
            >
              Gerenciar
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Alunos</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              358
            </motion.span>
            <span className="ml-2 text-gray-500">cadastrados</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/students"
              className="text-primary text-sm font-medium hover:underline"
            >
              Gerenciar
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Empresas</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              12
            </motion.span>
            <span className="ml-2 text-gray-500">parceiras</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/dashboard/companies"
              className="text-primary text-sm font-medium hover:underline"
            >
              Gerenciar
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Estatísticas do Sistema</h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Total de Moedas em Circulação</p>
                <span className="text-primary font-bold">42,500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Vantagens Resgatadas</p>
                <span className="text-primary font-bold">287</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Novos Usuários (Mês)</p>
                <span className="text-primary font-bold">+32</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Taxa de Engajamento</p>
                <span className="text-primary font-bold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/dashboard/institutions">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Instituições</p>
                <p className="text-xs text-gray-500 mt-1">Gerenciar instituições</p>
              </div>
            </Link>
            <Link href="/dashboard/teachers">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <Users className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Professores</p>
                <p className="text-xs text-gray-500 mt-1">Gerenciar professores</p>
              </div>
            </Link>
            <Link href="/dashboard/students">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <GraduationCap className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Alunos</p>
                <p className="text-xs text-gray-500 mt-1">Gerenciar alunos</p>
              </div>
            </Link>
            <Link href="/dashboard/companies">
              <div className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex flex-col items-center justify-center text-center h-32">
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">Empresas</p>
                <p className="text-xs text-gray-500 mt-1">Gerenciar empresas</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Olá, {user?.name}!</h1>
        <p className="text-gray-600">
          Bem-vindo ao seu painel de controle. Aqui você pode gerenciar todas as suas atividades.
        </p>
      </div>

      {user?.role === "STUDENT" && renderStudentDashboard()}
      {user?.role === "TEACHER" && renderTeacherDashboard()}
      {user?.role === "COMPANY" && renderCompanyDashboard()}
      {user?.role === "ADMIN" && renderAdminDashboard()}
    </motion.div>
  );
}