"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-provider";
import { Coins, Search, Send, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/lib/utils";
import toast from "react-hot-toast";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  institution: string;
}

export default function SendCoinsPage() {
  const { user } = useAuth();
  const [teacherBalance, setTeacherBalance] = useState(650);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [reason, setReason] = useState("");
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setStudents([
      { id: "1", name: "João Silva", email: "joao.silva@email.com", course: "Engenharia de Software", institution: "Universidade Federal" },
      { id: "2", name: "Maria Oliveira", email: "maria.oliveira@email.com", course: "Ciência da Computação", institution: "Universidade Federal" },
      { id: "3", name: "Pedro Santos", email: "pedro.santos@email.com", course: "Sistemas de Informação", institution: "Universidade Federal" },
      { id: "4", name: "Ana Pereira", email: "ana.pereira@email.com", course: "Engenharia Civil", institution: "Universidade Estadual" },
      { id: "5", name: "Lucas Costa", email: "lucas.costa@email.com", course: "Administração", institution: "Universidade Estadual" },
      { id: "6", name: "Juliana Almeida", email: "juliana.almeida@email.com", course: "Psicologia", institution: "Faculdade Particular" },
      { id: "7", name: "Rafael Santos", email: "rafael.santos@email.com", course: "Direito", institution: "Faculdade Particular" },
      { id: "8", name: "Camila Oliveira", email: "camila.oliveira@email.com", course: "Medicina", institution: "Universidade Federal" },
      { id: "9", name: "Bruno Lima", email: "bruno.lima@email.com", course: "Arquitetura", institution: "Universidade Estadual" },
      { id: "10", name: "Fernanda Silva", email: "fernanda.silva@email.com", course: "Design", institution: "Faculdade Particular" },
    ]);
  }, []);

  const handleSendCoins = () => {
    if (!selectedStudent) {
      toast.error("Selecione um aluno para enviar moedas");
      return;
    }
    
    if (!amount || amount <= 0) {
      toast.error("Informe uma quantidade válida de moedas");
      return;
    }
    
    if (amount > teacherBalance) {
      toast.error("Saldo insuficiente para enviar essa quantidade de moedas");
      return;
    }
    
    if (!reason.trim()) {
      toast.error("Informe o motivo do reconhecimento");
      return;
    }
    
    // In a real app, this would be an API call
    setTeacherBalance(teacherBalance - Number(amount));
    
    toast.success(`${amount} moedas enviadas com sucesso para ${selectedStudent.name}!`);
    
    // Send email notification
    const emailBody = `
      Olá ${selectedStudent.name},
      
      Você recebeu ${amount} moedas do professor ${user?.name}.
      
      Motivo: ${reason}
      
      Acesse a plataforma Moeda Estudantil para verificar seu saldo atualizado.
      
      Atenciosamente,
      Equipe Moeda Estudantil
    `;
    
    // In a real app, this would use a server-side email service
    // For this demo, we'll use the client-side mailto approach
    sendEmail({
      to: selectedStudent.email,
      subject: "Você recebeu moedas! - Moeda Estudantil",
      body: emailBody
    });
    
    // Reset form
    setSelectedStudent(null);
    setAmount("");
    setReason("");
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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
        <h1 className="text-2xl font-bold mb-2">Enviar Moedas</h1>
        <p className="text-gray-600">
          Reconheça o mérito dos alunos enviando moedas virtuais.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">Selecionar Aluno</h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar aluno por nome, curso ou instituição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum aluno encontrado com os termos de busca.
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedStudent?.id === student.id
                        ? "bg-primary/20 border border-primary"
                        : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.course} - {student.institution}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">Detalhes do Envio</h3>
            
            {selectedStudent ? (
              <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                <p className="font-medium">Aluno selecionado: {selectedStudent.name}</p>
                <p className="text-sm text-gray-600">{selectedStudent.course} - {selectedStudent.institution}</p>
              </div>
            ) : (
              <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-amber-700">Selecione um aluno na lista acima para enviar moedas.</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="mb-1 block">Quantidade de Moedas</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    max={teacherBalance}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                    placeholder="Ex: 50"
                    className="pr-16"
                    disabled={!selectedStudent}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-500">
                    <Coins className="h-4 w-4 mr-1" />
                    <span className="text-sm">moedas</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Máximo disponível: {teacherBalance} moedas</p>
              </div>
              
              <div>
                <Label htmlFor="reason" className="mb-1 block">Motivo do Reconhecimento</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Descreva o motivo pelo qual o aluno está recebendo as moedas..."
                  rows={4}
                  disabled={!selectedStudent}
                />
                <p className="text-xs text-gray-500 mt-1">O motivo será enviado ao aluno junto com as moedas.</p>
              </div>
              
              <Button
                onClick={handleSendCoins}
                disabled={!selectedStudent || !amount || amount <= 0 || amount > teacherBalance || !reason.trim()}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Moedas
              </Button>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-6 sticky top-24"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Seu Saldo</h3>
              <div className="p-2 bg-primary/20 rounded-full">
                <Coins className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-end mb-6">
              <motion.span 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {teacherBalance}
              </motion.span>
              <span className="ml-2 text-gray-500">moedas disponíveis</span>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Lembrete
              </h4>
              <p className="text-sm text-blue-700">
                Professores recebem 1.000 moedas por semestre. O saldo é acumulativo entre os períodos.
              </p>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Dicas para Reconhecimento</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mr-2 mt-0.5">1</div>
                  <p>Reconheça participações ativas em sala de aula</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mr-2 mt-0.5">2</div>
                  <p>Premie trabalhos e projetos de destaque</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mr-2 mt-0.5">3</div>
                  <p>Valorize a colaboração e trabalho em equipe</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs mr-2 mt-0.5">4</div>
                  <p>Incentive a criatividade e inovação</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}