"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-provider";
import { Coins, Gift, Plus, Search, Filter, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateCouponCode, sendEmail } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";

interface Advantage {
  id: number;
  name: string;
  description: string;
  cost: number;
  company: string;
  imageUrl: string;
  redemptions?: number;
}

export default function AdvantagesPage() {
  const { user } = useAuth();
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const [studentBalance, setStudentBalance] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdvantage, setNewAdvantage] = useState({
    name: "",
    description: "",
    cost: 0,
    imageUrl: ""
  });

  useEffect(() => {
    // In a real app, this would be an API call
    if (user?.role === "STUDENT") {
      setIsCompany(false);
      setStudentBalance(750);
      setAdvantages([
        { 
          id: 1, 
          name: "Desconto em Livraria", 
          description: "Cupom de 20% de desconto em qualquer livro da Livraria Central",
          cost: 200, 
          company: "Livraria Central", 
          imageUrl: "https://cdn.create.vista.com/downloads/e96ae808-b3f5-4e5a-806c-513b9baf14ae_640.jpeg" 
        },
        { 
          id: 2, 
          name: "Curso Online Premium", 
          description: "Acesso a um curso online premium da plataforma EduTech por 1 mês",
          cost: 500, 
          company: "EduTech", 
          imageUrl: "https://images.template.net/43643/Online-courses-Certificate-Template880.jpg" 
        },
        { 
          id: 3, 
          name: "Café Grátis por 1 Mês", 
          description: "Um café grátis por dia durante um mês no Café do Campus",
          cost: 300, 
          company: "Café do Campus", 
          imageUrl: "https://marketplace.canva.com/EAFOtCItBgM/1/0/566w/canva-coffee-shop-coupon-gQXqkTOUNu8.jpg" 
        },
        { 
          id: 4, 
          name: "Desconto em Material Escolar", 
          description: "Cupom de 15% de desconto em material escolar na Papelaria Universitária",
          cost: 150, 
          company: "Papelaria Universitária", 
          imageUrl: "https://img.freepik.com/premium-vector/school-supplies-sale-banner-template_97632-1203.jpg" 
        },
        { 
          id: 5, 
          name: "Ingresso para Cinema", 
          description: "Um ingresso para qualquer filme no CineUniversidade",
          cost: 250, 
          company: "CineUniversidade", 
          imageUrl: "https://img.freepik.com/premium-vector/cinema-movie-ticket-template_8071-4572.jpg" 
        },
        { 
          id: 6, 
          name: "Acesso à Biblioteca Premium", 
          description: "Acesso por 3 meses à biblioteca premium digital com milhares de títulos",
          cost: 400, 
          company: "BiblioTech", 
          imageUrl: "https://img.freepik.com/premium-vector/online-library-app-banner_23-2148640982.jpg" 
        },
      ]);
    } else if (user?.role === "COMPANY") {
      setIsCompany(true);
      setAdvantages([
        { 
          id: 1, 
          name: "Desconto em Livraria", 
          description: "Cupom de 20% de desconto em qualquer livro da Livraria Central",
          cost: 200, 
          company: "Livraria Central", 
          redemptions: 15,
          imageUrl: "https://cdn.create.vista.com/downloads/e96ae808-b3f5-4e5a-806c-513b9baf14ae_640.jpeg" 
        },
        { 
          id: 2, 
          name: "Curso Online Premium", 
          description: "Acesso a um curso online premium da plataforma EduTech por 1 mês",
          cost: 500, 
          company: "EduTech", 
          redemptions: 8,
          imageUrl: "https://images.template.net/43643/Online-courses-Certificate-Template880.jpg" 
        },
        { 
          id: 3, 
          name: "Café Grátis por 1 Mês", 
          description: "Um café grátis por dia durante um mês no Café do Campus",
          cost: 300, 
          company: "Café do Campus", 
          redemptions: 22,
          imageUrl: "https://marketplace.canva.com/EAFOtCItBgM/1/0/566w/canva-coffee-shop-coupon-gQXqkTOUNu8.jpg" 
        },
      ]);
    }
  }, [user]);

  const handleRedeemAdvantage = (advantage: Advantage) => {
    if (studentBalance < advantage.cost) {
      toast.error("Saldo insuficiente para resgatar esta vantagem");
      return;
    }

    const couponCode = generateCouponCode();
    
    // In a real app, this would be an API call to update the database
    setStudentBalance(studentBalance - advantage.cost);
    
    toast.success(`Vantagem resgatada com sucesso! Seu código: ${couponCode}`);
    
    // Send email to student and company
    const studentEmailBody = `
      Olá ${user?.name},
      
      Você resgatou a vantagem "${advantage.name}" oferecida por ${advantage.company}.
      
      Seu código de cupom é: ${couponCode}
      
      Apresente este código para resgatar sua vantagem.
      
      Atenciosamente,
      Equipe Moeda Estudantil
    `;
    
    const companyEmailBody = `
      Olá ${advantage.company},
      
      O aluno ${user?.name} resgatou a vantagem "${advantage.name}".
      
      Código de cupom: ${couponCode}
      
      Atenciosamente,
      Equipe Moeda Estudantil
    `;
    
    // In a real app, this would use a server-side email service
    // For this demo, we'll use the client-side mailto approach
    sendEmail({
      to: user?.email || "",
      subject: "Resgate de Vantagem - Moeda Estudantil",
      body: studentEmailBody
    });
  };

  const handleAddAdvantage = () => {
    if (!newAdvantage.name || !newAdvantage.description || newAdvantage.cost <= 0) {
      toast.error("Por favor, preencha todos os campos corretamente");
      return;
    }

    // In a real app, this would be an API call
    const newId = advantages.length > 0 ? Math.max(...advantages.map(a => a.id)) + 1 : 1;
    
    const advantageToAdd: Advantage = {
      id: newId,
      name: newAdvantage.name,
      description: newAdvantage.description,
      cost: newAdvantage.cost,
      company: user?.name || "Empresa",
      imageUrl: newAdvantage.imageUrl || "https://via.placeholder.com/300",
      redemptions: 0
    };
    
    setAdvantages([...advantages, advantageToAdd]);
    setNewAdvantage({
      name: "",
      description: "",
      cost: 0,
      imageUrl: ""
    });
    setShowAddForm(false);
    
    toast.success("Vantagem adicionada com sucesso!");
  };

  const handleDeleteAdvantage = (id: number) => {
    // In a real app, this would be an API call
    setAdvantages(advantages.filter(advantage => advantage.id !== id));
    toast.success("Vantagem removida com sucesso!");
  };

  const filteredAdvantages = advantages.filter(advantage => 
    advantage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advantage.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advantage.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold mb-2">
          {isCompany ? "Gerenciar Vantagens" : "Vantagens Disponíveis"}
        </h1>
        <p className="text-gray-600">
          {isCompany 
            ? "Gerencie as vantagens oferecidas pela sua empresa." 
            : "Explore e resgate vantagens com suas moedas."}
        </p>
      </motion.div>

      {!isCompany && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Seu Saldo</h3>
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
            <span className="ml-2 text-gray-500">moedas disponíveis</span>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar vantagens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {isCompany && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Vantagem
          </Button>
        )}
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">Adicionar Nova Vantagem</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Vantagem
                </label>
                <Input
                  id="name"
                  value={newAdvantage.name}
                  onChange={(e) => setNewAdvantage({...newAdvantage, name: e.target.value})}
                  placeholder="Ex: Desconto em Livraria"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  id="description"
                  value={newAdvantage.description}
                  onChange={(e) => setNewAdvantage({...newAdvantage, description: e.target.value})}
                  placeholder="Descreva a vantagem em detalhes"
                  rows={4}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                  Custo em Moedas
                </label>
                <Input
                  id="cost"
                  type="number"
                  min="1"
                  value={newAdvantage.cost || ""}
                  onChange={(e) => setNewAdvantage({...newAdvantage, cost: parseInt(e.target.value) || 0})}
                  placeholder="Ex: 200"
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Imagem
                </label>
                <Input
                  id="imageUrl"
                  value={newAdvantage.imageUrl}
                  onChange={(e) => setNewAdvantage({...newAdvantage, imageUrl: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={handleAddAdvantage}
                  className="flex-1"
                >
                  Adicionar Vantagem
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {filteredAdvantages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Gift className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma vantagem encontrada</h3>
          <p className="text-gray-500">
            {searchTerm 
              ? "Tente ajustar sua busca para encontrar mais resultados." 
              : isCompany 
                ? "Clique em 'Nova Vantagem' para adicionar sua primeira oferta." 
                : "Volte mais tarde para verificar novas vantagens disponíveis."}
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAdvantages.map((advantage) => (
            <motion.div
              key={advantage.id}
              variants={cardVariants}
              className="advantage-card flex flex-col h-full"
            >
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift className="h-12 w-12 text-gray-400" />
                </div>
                {advantage.imageUrl && (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <Gift className="h-16 w-16 text-primary/50" />
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{advantage.name}</h3>
                <p className="text-gray-500 text-sm mb-1">Oferecido por: {advantage.company}</p>
                <p className="text-gray-600 mb-4 flex-1">{advantage.description}</p>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center text-primary font-bold">
                    {advantage.cost} <Coins className="h-4 w-4 ml-1" />
                  </div>
                  
                  {isCompany ? (
                    <div className="flex space-x-2">
                      <div className="text-gray-600 text-sm flex items-center">
                        {advantage.redemptions} resgates
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAdvantage(advantage.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Remover
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleRedeemAdvantage(advantage)}
                      disabled={studentBalance < advantage.cost}
                      size="sm"
                      className="flex items-center"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Resgatar
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}