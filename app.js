// Função para calcular o KM percorrido
document.addEventListener('DOMContentLoaded', () => {
    const kmFinal = document.getElementById('km_final');
    const kmInicio = document.getElementById('km_inicio');
    const kmPercorrido = document.getElementById('km_percorrido');

    const calcularKm = () => {
        const final = parseFloat(kmFinal.value) || 0;
        const inicio = parseFloat(kmInicio.value) || 0;
        if (final >= inicio) {
            kmPercorrido.value = final - inicio;
        } else {
            kmPercorrido.value = 0;
        }
    };

    kmFinal.addEventListener('input', calcularKm);
    kmInicio.addEventListener('input', calcularKm);
});

// Estrutura para a integração com o Firestore (requer a biblioteca Firebase no HTML)
// NOTA: Para um aplicativo real, as configurações e a segurança devem ser tratadas em um ambiente de back-end (Cloud Functions, por exemplo).
const firebaseConfig = {
    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOrfcwLzIMUjuLjCq4dCWpts7UXigp5fs",
  authDomain: "relatorio-supervisor-72ef1.firebaseapp.com",
  projectId: "relatorio-supervisor-72ef1",
  storageBucket: "relatorio-supervisor-72ef1.firebasestorage.app",
  messagingSenderId: "288935240510",
  appId: "1:288935240510:web:0ee6cc2c83b02dc07bc26f",
  measurementId: "G-P6CG8TJR2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

// ** Importante **: Adicionar o script da biblioteca do Firebase ao HTML antes de usar (ex: <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js"></script>)
// const db = firebase.firestore();

/**
 * Coleta todos os dados do formulário e prepara o relatório.
 * @param {Event} event 
 */
function gerarRelatorio(event) {
    event.preventDefault();
    const form = document.getElementById('relatorioForm');
    const formData = new FormData(form);
    const data = {};

    // 1. Coleta e serializa os dados do formulário (incluindo campos de textarea)
    form.querySelectorAll('input, select, textarea').forEach(field => {
        if (field.id) {
            data[field.id] = field.value;
        }
    });

    console.log("Dados Coletados:", data);
    
    // 2. Tenta salvar os dados no Firestore (simulação de salvamento/gerenciamento)
    // try {
    //     // await db.collection("relatorios").add(data);
    //     console.log("Dados prontos para serem salvos no Firestore.");
    // } catch (e) {
    //     console.error("Erro ao adicionar documento: ", e);
    // }

    // 3. Geração do Relatório (Simulação de preenchimento do documento)
    //    Esta é a parte mais complexa e exigiria uma biblioteca de geração de documentos (PDF, DOCX) 
    //    em um servidor (Back-end) ou o uso de bibliotecas JS complexas (como 'jsPDF' ou 'docx').
    
    // ** Ação Simplificada: Exibir os dados e fornecer um download simples (JSON) **
    const relatorioJSON = JSON.stringify(data, null, 2);

    alert("Relatório Gerado com Sucesso! Os dados foram coletados e estão prontos para salvamento/download. (Verifique o console do navegador)");
    
    // Cria um blob (objeto de arquivo) para download
    const blob = new Blob([relatorioJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Relatorio_Ronda_${data.data || new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}
