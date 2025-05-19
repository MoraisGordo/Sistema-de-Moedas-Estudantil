"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-provider";
import { Coins, Calendar, Filter, Download, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  teacher?: string;
  student?: string;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterMonth, setFilterMonth] = useState<string>("");

  useEffect(() => {
    // In a real app, this would be an API call
    if (user?.role === "STUDENT") {
      setIsStudent(true);
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

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const getUniqueMonths = () => {
    const months = transactions.map(t => {
      const date = new Date(t.date);
      return `${date.getFullYear()}-${date.getMonth() + 1}`;
    });
    
    // Fix: Avoid using spread operator with Set
    const uniqueMonths = Array.from(new Set(months));
    return uniqueMonths.sort().reverse();
  };

  const filteredAndSortedTransactions = transactions
    .filter(t => {
      if (!filterMonth) return true;
      const date = new Date(t.date);
      const transactionMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
      return transactionMonth === filterMonth;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

  const totalAmount = filteredAndSortedTransactions.reduce((sum, t) => sum + t.amount, 0);

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
        <h1 className="text-2xl font-bold mb-2">Histórico de Transações</h1>
        <p className="text-gray-600">
          {isStudent 
            ? "Visualize o histórico de moedas recebidas." 
            : "Visualize o histórico de moedas enviadas aos alunos."}
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
            <h3 className="text-lg font-medium text-gray-700">Total de Transações</h3>
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
              {filteredAndSortedTransactions.length}
            </motion.span>
            <span className="ml-2 text-gray-500">transações</span>
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
              {isStudent ? "Total Recebido" : "Total Enviado"}
            </h3>
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
              {totalAmount}
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
            <h3 className="text-lg font-medium text-gray-700">Filtros</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Filter className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="input-field text-sm"
            >
              <option value="">Todos os meses</option>
              {getUniqueMonths().map(month => {
                const [year, monthNum] = month.split('-');
                const date = new Date(parseInt(year), parseInt(monthNum) - 1);
                const monthName = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
                return (
                  <option key={month} value={month}>
                    {monthName}
                  </option>
                );
              })}
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSortDirection}
              className="flex items-center justify-center"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {sortDirection === "desc" ? "Mais recentes primeiro" : "Mais antigos primeiro"}
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-700">Detalhes das Transações</h3>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
        
        {filteredAndSortedTransactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Nenhuma transação encontrada</p>
            <p className="text-sm">Tente ajustar os filtros ou volte mais tarde.</p>
          </div>
        ) : (
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
                {filteredAndSortedTransactions.map((transaction) => (
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
        )}
        
        {filteredAndSortedTransactions.length > 0 && (
          <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm text-gray-500">
            <span>Mostrando {filteredAndSortedTransactions.length} de {transactions.length} transações</span>
            <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}