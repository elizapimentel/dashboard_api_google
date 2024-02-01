import { Component, OnInit } from '@angular/core';

import { DadosService } from './dados.service';

//declaracao da var global para que possa ser utilizada no método init
//se fosse outra biblioteca, como jQuery, utilizaria o nome jQuery no lugar de google
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor(private dadosService: DadosService) {}

  // Método chamado quando o componente é inicializado - é um observable
  ngOnInit() {
  	this.dadosService.obterDados().subscribe(
  		dados => {
  			this.dados = dados;
  			this.init();
  		});
  }

  /**
   * Inicializa a API de gráficos com delay de 1 segundo, com o setTimeout,
   * o que permite a integração da API do google com o Angular, 
   * qndo o setOnLoadCallBack chamar o exibirGraficos.
   *
   * @return void
   */
  init(): void {
    if(typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']}); 
      //infos como estava no site do google ->> // Load the Visualization API and the corechart package.  google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
      	google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  /**
   * Método chamado assim que a API de gráficos é inicializada.
   * Reponsável por chamar os métodos geradores dos gráficos.
   *
   * @return void
   */
  exibirGraficos(): void {
  	this.exibirPieChart(); 
  	this.exibir3dPieChart();
  	this.exibirBarChart();
  	this.exibirLineChart();
  	this.exibirColumnChart();
  	this.exibirDonutChart();
  }

  /**
   * Exibe o gráfico Pie Chart = gráfico de pizza.
   * Implementacao da Primeira div do html.
   * @return void
   */
  exibirPieChart(): void {
  	const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el); //instancia do gráfico

    //draw é o comando que irá desenhar o gráfico. 
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico Pie Chart em 3D.
   *
   * @return void
   */
  exibir3dPieChart(): void {
  	const el = document.getElementById('3d_pie_chart');
  	const chart = new google.visualization.PieChart(el);
    //foi adicionado uma opcão a mais para informar que o gráfico é 3D
	  const opcoes = this.obterOpcoes();

    opcoes['is3D'] = true; //flag
    chart.draw(this.obterDataTable(), opcoes);
  }

  /**
   * Exibe o gráfico Donut Chart.
   *
   * @return void
   */
  exibirDonutChart(): void {
  	const el = document.getElementById('donut_chart');
  	const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();

    opcoes['pieHole'] = 0.4; //informa o espaçamento do buraco do donut
    chart.draw(this.obterDataTable(), opcoes);
  }

  /**
   * Exibe o gráfico Bar Chart.
   *
   * @return void
   */
  exibirBarChart(): void {
  	const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico Line Chart.
   * Coloca visualization.LineChart pra idenficar que é gráfico de linha
   *
   * @return void
   */
  exibirLineChart(): void {
  	const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico Column Chart.
   * Coloca visualization.ColumnChart pra idenficar que é gráfico de coluna
   * @return void
   */
  exibirColumnChart(): void {
  	const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Cria e retorna o objeto DataTable da API de gráficos,
   * responsável por definir os dados do gráfico. - o formato do gráfico
   *
   * @return any
   */
  obterDataTable(): any {
  	const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  /**
   * Retorna as opções do gráfico, que incluem o título
   * e tamanho do gráfico.
   *
   * @return any
   */
  obterOpcoes(): any {
  	return {
    	'title': 'Quantidade de cadastros primeiro semestre',
        'width': 400,
        'height': 300
    };
  }

}
