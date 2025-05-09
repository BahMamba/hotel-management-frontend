import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hotel-form.component.html',
  styles: []
})
export class HotelFormComponent implements OnInit {
  hotelForm: FormGroup;
  hotelId: number | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.hotelId) {
      this.hotelService.getHotel(this.hotelId).subscribe({
        next: (hotel) => this.hotelForm.patchValue(hotel),
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des données de l\'hôtel : ' + (err.message || 'Veuillez réessayer.');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires correctement.';
      return;
    }

    const hotelData: Partial<Hotel> = this.hotelForm.value;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.hotelId) {
      this.hotelService.updateHotel(this.hotelId, hotelData).subscribe({
        next: () => {
          this.successMessage = 'Hôtel mis à jour avec succès !';
          setTimeout(() => this.router.navigate(['/hotels/admin-space']), 2000);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la mise à jour : ' + (err.message || 'Veuillez réessayer.');
        }
      });
    } else {
      this.hotelService.addHotel(hotelData).subscribe({
        next: () => {
          this.successMessage = 'Hôtel créé avec succès !';
          setTimeout(() => this.router.navigate(['/hotels/admin-space']), 2000);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'ajout : ' + (err.message || 'Veuillez réessayer.');
        }
      });
    }
  }
}