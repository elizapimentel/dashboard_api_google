import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DadosService {

	readonly dados = [
        ['Janeiro', 33],
        ['Fevereiro', 68],
        ['Março', 49],
        ['Abril', 15],
        ['Maio', 80],
        ['Junho', 27]
    ]

	constructor() {}

	/**
	 * Retorna um observable contendo os dados a serem
	 * exibidos no gráfico.
	 * Forma de criar observable manualmente.
   * Comando next pode ser usado várias vezes para emitir valores. 
   * (nesse cado só precisa de 1 vez, pois é um array de dados)
	 * @return Observable<any>
	 */
	obterDados(): Observable<any> {
		return new Observable(observable => {
			observable.next(this.dados);
			observable.complete();
		});
	}

}
