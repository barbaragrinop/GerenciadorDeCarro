import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Http';

  car = {} as Car;
  cars: Car[];

  constructor(private carService: CarService){}

  ngOnInit(): void {
    this.getCars();
  }

  //pegando todos
  getCars(){
    this.carService.getCarros().subscribe((cars: Car[]) => {
      this.cars = cars;
    })
  }

  //defini se um carro será criado ou atualizado
  saveCar(form: NgForm){
    if(this.car.id !== undefined){
      this.carService.updateCar(this.car).subscribe(()=>{
        this.cleanForm(form);
      });
    } else {
      this.carService.saveCar(this.car).subscribe(()=>{
        this.cleanForm(form);
      })
    }
  }

  //excluir
  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(() => {
      this.getCars();
    });
  }

  //copia o carro p ser editado
  editCar(car: Car){
    this.car = {...car};
  }

//limpa o dormulario
  cleanForm(form: NgForm) {
    this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }


}
