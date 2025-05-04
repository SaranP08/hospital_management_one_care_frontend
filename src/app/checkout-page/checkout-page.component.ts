import { Component, OnInit } from '@angular/core';
import { Address, Cart } from '../types/common-type';
import { CartPageService } from '../cart-page/cart-page.service';
import { AuthService } from '../auth/auth.service';
import { CheckoutPageService } from './checkout-page.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  addresses: Address[] = [];
  userId: string | null = null;
  carts: Cart[] = [];
  totalCost: number = 0;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: Number[] = [2024, 2025, 2026, 2027, 2028, 2029];
  paymentFormGroup: FormGroup;
  addressFormControl: FormControl = new FormControl(0);

  paymentMode: FormControl = new FormControl('ONLINE_TRANSACTION');
  constructor(private router: Router, private _formBuilder: FormBuilder, private checkoutPageService: CheckoutPageService, private _authService: AuthService, private _activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) {
    this.paymentFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.paymentFormGroup.valueChanges.subscribe((data) => {

    })
    this._activatedRoute.queryParams.subscribe((data) => {
      const carts = JSON.parse(data['data']);

      this.carts = carts;
    });
    this.carts.forEach((cart) => {
      this.totalCost += cart.actualCost * cart.qty;
    })
    this._authService.getUserId().subscribe((id) => {
      this.userId = id;

      this.checkoutPageService.getAddresses(this.userId).subscribe((data) => {
        this.addresses = data.address;

      })
    });


  }


  payNow(): void {
    const addressId = this.addresses[this.addressFormControl.value]._id;
    let productIds: String[] = [];

    this.carts.forEach((cart) => {
      productIds.push(cart._id);
    });

    const payload = {
      productIds: productIds,
      paymentMode: this.paymentMode.value,
      addressId: addressId

    }
    this.checkoutPageService.purchaseProducts(this.userId, payload).subscribe((data) => {
      this.snackbar.open("Purchased Successfully", "", {
        "duration": 2000
      });
      this.router.navigate(['/services/medicines']);
    }, (error) => {
      this.snackbar.open("Please try again later", "", {
        "duration": 2000
      });
    })

  }


}
