import useNotificador from "@/hooks/notificador";
const notificar = useNotificador()

export const lidarComSucesso = (tipo, titulo, mensagem) => {
	notificar(tipo, titulo, mensagem);
}
export const lidarComFalha = (tipo, titulo, mensagem) => {
	notificar(tipo, titulo, mensagem);
}