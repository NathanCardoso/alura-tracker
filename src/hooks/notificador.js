import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-de-mutacoes";

export default () => {
	const notificar = (tipo, titulo, texto) => {
		store.commit(NOTIFICAR, {
			titulo,
			texto,
			tipo
		})
	}

	return notificar
}