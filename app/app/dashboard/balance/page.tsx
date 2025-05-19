"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-provider";
import { Coins, TrendingUp, TrendingDown, Calendar } from "lucide-react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  teacher?: string;
  student?: string;
}

export default function BalancePage() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    if (user?.role === "STUDENT") {
      setIsStudent(true);
      setBalance(750);
      setTransactions([
        { id: 1, description: "Participação em projeto", amount: 50, date: "2023-06-15", teacher: "Prof. Carlos Silva" },
        { id: 2, description: "Melhor apresentação", amount: 100, date: "2023-06-10", teacher: "Profa. Ana Oliveira" },
        { id: 3, description: "Colaboração em grupo", amount: 30, date: "2023-06-05", teacher: "Prof. Roberto Santos" },
        { id: 4, description: "Resolução de problema", amount: 75, date: "2023-05-28", teacher: "Prof. Marcos Pereira" },
        { id: 5, description: "Participação em aula", amount: 25, date: "2023-05-20", teacher: "Profa. Juliana Costa" },
        { id: 6, description: "Projeto final", amount: 150, date: "2023-05-15", teacher: "Prof. Ricardo Almeida" },
        { id: 7, description: "Trabalho em equipe", amount: 40, date: "2023-05-10", teacher: "Profa. Carla Santos" },
        { id: 8, description: "Apresentação de seminário", amount: 80, date: "2023-05-05", teacher: "Prof. Paulo Oliveira" },
        { id: 9, description: "Monitoria", amount: 120, date: "2023-04-28", teacher: "Profa. Fernanda Lima" },
        { id: 10, description: "Iniciação científica", amount: 80, date: "2023-04-20", teacher: "Prof. André Silva" },
      ]);
    } else if (user?.role === "TEACHER") {
      setIsStudent(false);
      setBalance(650);
      setTransactions([
        { id: 1, description: "Participação em projeto", amount: 50, date: "2023-06-15", student: "João Silva" },
        { id: 2, description: "Melhor apresentação", amount: 100, date: "2023-06-10", student: "Maria Oliveira" },
        { id: 3, description: "Colaboração em grupo", amount: 30, date: "2023-06-05", student: "Pedro Santos" },
        { id: 4, description: "Resolução de problema", amount: 75, date: "2023-05-28", student: "Ana Pereira" },
        { id: 5, description: "Participação em aula", amount: 25, date: "2023-05-20", student: "Lucas Costa" },
        { id: 6, description: "Projeto final", amount: 150, date: "2023-05-15", student: "Juliana Almeida" },
        { id: 7, description: "Trabalho em equipe", amount: 40, date: "2023-05-10", student: "Rafael Santos" },
        { id: 8, description: "Apresentação de seminário", amount: 80, date: "2023-05-05", student: "Camila Oliveira" },
        { id: 9, description: "Monitoria", amount: 120, date: "2023-04-28", student: "Bruno Lima" },
        { id: 10, description: "Iniciação científica", amount: 80, date: "2023-04-20", student: "Fernanda Silva" },
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

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold mb-2">Saldo de Moedas</h1>
        <p className="text-gray-600">
          {isStudent 
            ? "Acompanhe seu saldo de moedas e histórico de transações recebidas." 
            : "Acompanhe seu saldo de moedas e histórico de distribuição para alunos."}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Saldo Atual</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Coins className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-4xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {balance}
            </motion.span>
            <span className="ml-2 text-gray-500">moedas</span>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">
              {isStudent ? "Total Recebido" : "Total Distribuído"}
            </h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-4xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {transactions.reduce((sum, transaction) => sum + transaction.amount, 0)}
            </motion.span>
            <span className="ml-2 text-gray-500">moedas</span>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Última Atualização</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <motion.span 
              className="text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {transactions.length > 0 ? transactions[0].date : "Nenhuma transação"}
            </motion.span>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h3 className="text-lg font-medium text-gray-700 mb-6">Histórico de Transações</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Data</th>
                <th className="py-3 px-4 text-left">Descrição</th>
                <th className="py-3 px-4 text-left">{isStudent ? "Professor" : "Aluno"}</th>
                <th className="py-3 px-4 text-right">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <motion.tr 
                  key={transaction.id}
                  variants={cardVariants}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-600">{transaction.date}</td>
                  <td className="py-3 px-4 font-medium">{transaction.description}</td>
                  <td className="py-3 px-4 text-gray-600">{isStudent ? transaction.teacher : transaction.student}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-bold ${isStudent ? "text-green-600" : "text-amber-600"} flex items-center justify-end`}>
                      {isStudent ? "+" : "-"}{transaction.amount}
                      <Coins className="h-4 w-4 ml-1" />
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma transação encontrada.
          </div>
        )}
      </motion.div>
    </div>
  );
}