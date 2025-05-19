"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-provider";
import { Coins, Gift, Calendar, Filter, Download, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendEmail } from "@/lib/utils";
import toast from "react-hot-toast";

interface Redemption {
  id: number;
  advantageName: string;
  advantageCost: number;
  studentName: string;
  studentEmail: string;
  couponCode: string;
  date: string;
  status: "pending" | "used" | "expired";
}

export default function RedemptionsPage() {
  const { user } = useAuth();
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    // In a real app, this would be an API call
    setRedemptions([
      { 
        id: 1, 
        advantageName: "Desconto em Livraria", 
        advantageCost: 200, 
        studentName: "João Silva", 
        studentEmail: "joao.silva@email.com",
        couponCode: "BOOK2023", 
        date: "2023-06-15", 
        status: "pending" 
      },
      { 
        id: 2, 
        advantageName: "Curso Online Premium", 
        advantageCost: 500, 
        studentName: "Maria Oliveira", 
        studentEmail: "maria.oliveira@email.com",
        couponCode: "COURSE50", 
        date: "2023-06-10", 
        status: "used" 
      },
      { 
        id: 3, 
        advantageName: "Café Grátis por 1 Mês", 
        advantageCost: 300, 
        studentName: "Pedro Santos", 
        studentEmail: "pedro.santos@email.com",
        couponCode: "COFFEE30", 
        date: "2023-06-05", 
        status: "pending" 
      },
      { 
        id: 4, 
        advantageName: "Desconto em Material Escolar", 
        advantageCost: 150, 
        studentName: "Ana Pereira", 
        studentEmail: "ana.pereira@email.com",
        couponCode: "SCHOOL15", 
        date: "2023-05-28", 
        status: "pending" 
      },
      { 
        id: 5, 
        advantageName: "Ingresso para Cinema", 
        advantageCost: 250, 
        studentName: "Lucas Costa", 
        studentEmail: "lucas.costa@email.com",
        couponCode: "MOVIE123", 
        date: "2023-05-20", 
        status: "expired" 
      },
      { 
        id: 6, 
        advantageName: "Acesso à Biblioteca Premium", 
        advantageCost: 400, 
        studentName: "Juliana Almeida", 
        studentEmail: "juliana.almeida@email.com",
        couponCode: "LIBRARY3", 
        date: "2023-05-15", 
        status: "used" 
      },
      { 
        id: 7, 
        advantageName: "Desconto em Livraria", 
        advantageCost: 200, 
        studentName: "Rafael Santos", 
        studentEmail: "rafael.santos@email.com",
        couponCode: "BOOK1234", 
        date: "2023-05-10", 
        status: "used" 
      },
      { 
        id: 8, 
        advantageName: "Curso Online Premium", 
        advantageCost: 500, 
        studentName: "Camila Oliveira", 
        studentEmail: "camila.oliveira@email.com",
        couponCode: "COURSE99", 
        date: "2023-05-05", 
        status: "pending" 
      },
    ]);
  }, []);

  const handleContactStudent = (redemption: Redemption) => {
    const emailBody = `
      Olá ${redemption.studentName},
      
      Estamos entrando em contato sobre o seu resgate da vantagem "${redemption.advantageName}" com o código de cupom ${redemption.couponCode}.
      
      Por favor, responda este e-mail para combinarmos os detalhes da utilização do seu cupom.
      
      Atenciosamente,
      ${user?.name}
    `;
    
    // In a real app, this would use a server-side email service
    // For this demo, we'll use the client-side mailto approach
    sendEmail({
      to: redemption.studentEmail,
      subject: `Sobre seu resgate: ${redemption.advantageName}`,
      body: emailBody
    });
    
    toast.success(`E-mail para ${redemption.studentName} aberto no seu cliente de e-mail`);
  };

  const handleUpdateStatus = (id: number, newStatus: "pending" | "used" | "expired") => {
    // In a real app, this would be an API call
    setRedemptions(redemptions.map(redemption => 
      redemption.id === id ? { ...redemption, status: newStatus } : redemption
    ));
    
    toast.success("Status atualizado com sucesso!");
  };

  const filteredRedemptions = redemptions.filter(redemption => 
    (redemption.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     redemption.advantageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     redemption.couponCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === "" || redemption.status === statusFilter)
  );

  const getStatusCount = (status: string) => {
    return redemptions.filter(r => r.status === status).length;
  };

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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "used":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "used":
        return "Utilizado";
      case "expired":
        return "Expirado";
      default:
        return status;
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
        <h1 className="text-2xl font-bold mb-2">Resgates de Vantagens</h1>
        <p className="text-gray-600">
          Gerencie os resgates de vantagens realizados pelos alunos.
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
            <h3 className="text-lg font-medium text-gray-700">Total de Resgates</h3>
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
              {redemptions.length}
            </motion.span>
            <span className="ml-2 text-gray-500">resgates</span>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Valor Total</h3>
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
              {redemptions.reduce((sum, r) => sum + r.advantageCost, 0)}
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
            <h3 className="text-lg font-medium text-gray-700">Status</h3>
            <div className="p-2 bg-primary/20 rounded-full">
              <Filter className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-md bg-blue-50">
              <p className="text-lg font-bold text-blue-700">{getStatusCount("pending")}</p>
              <p className="text-xs text-blue-600">Pendentes</p>
            </div>
            <div className="text-center p-2 rounded-md bg-green-50">
              <p className="text-lg font-bold text-green-700">{getStatusCount("used")}</p>
              <p className="text-xs text-green-600">Utilizados</p>
            </div>
            <div className="text-center p-2 rounded-md bg-red-50">
              <p className="text-lg font-bold text-red-700">{getStatusCount("expired")}</p>
              <p className="text-xs text-red-600">Expirados</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por aluno, vantagem ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field text-sm"
          >
            <option value="">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="used">Utilizados</option>
            <option value="expired">Expirados</option>
          </select>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-md p-6"
      >
        {filteredRedemptions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Gift className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Nenhum resgate encontrado</p>
            <p className="text-sm">Tente ajustar os filtros ou volte mais tarde.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Data</th>
                  <th className="py-3 px-4 text-left">Aluno</th>
                  <th className="py-3 px-4 text-left">Vantagem</th>
                  <th className="py-3 px-4 text-left">Código</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredRedemptions.map((redemption) => (
                  <motion.tr 
                    key={redemption.id}
                    variants={cardVariants}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-600">{redemption.date}</td>
                    <td className="py-3 px-4 font-medium">{redemption.studentName}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p>{redemption.advantageName}</p>
                        <p className="text-xs text-gray-500">{redemption.advantageCost} moedas</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                        {redemption.couponCode}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(redemption.status)}`}>
                        {getStatusLabel(redemption.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactStudent(redemption)}
                          title="Contatar Aluno"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        
                        <select
                          value={redemption.status}
                          onChange={(e) => handleUpdateStatus(redemption.id, e.target.value as any)}
                          className="text-xs rounded border border-gray-300 px-2 py-1"
                        >
                          <option value="pending">Pendente</option>
                          <option value="used">Utilizado</option>
                          <option value="expired">Expirado</option>
                        </select>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {filteredRedemptions.length > 0 && (
          <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm text-gray-500">
            <span>Mostrando {filteredRedemptions.length} de {redemptions.length} resgates</span>
            <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}