import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../../interfaces/product';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
    insertForm: FormGroup;
    name: FormControl;
    price: FormControl;
    description: FormControl;
    imageUrl: FormControl;

    updateForm: FormGroup;
    _name: FormControl;
    _price: FormControl;
    _description: FormControl;
    _imageUrl: FormControl;
    _id: FormControl;

    @ViewChild('template') modal: TemplateRef<any>;
    @ViewChild('editTemplate') editmodal: TemplateRef<any>;

    modalMessage: string;
    modalRef: BsModalRef;
    selectedProduct: Product;
    products$: Observable<Product[]>;
    products: Product[] = [];
    userRoleStatus: string;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;

    constructor(private productservice: ProductService,
        private modalService: BsModalService,
        private fb: FormBuilder,
        private chRef: ChangeDetectorRef,
        private router: Router,
        private acct: AccountService) { }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 9,
            autoWidth: true,
            order: [[0, 'desc']]
        };

        this.products$ = this.productservice.getProducts();

        this.products$.subscribe(result => {
            this.products = result;

            this.chRef.detectChanges();

            this.dtTrigger.next();
        });

        this.acct.currentUserRole.subscribe(result => { this.userRoleStatus = result });
        this.modalMessage = "All Fields Are Mandatory";

        let validateImageUrl: string = '^(https?:\/\/.*\.(?:png|jpg))$';

        this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
        this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
        this.description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
        this.imageUrl = new FormControl('', [Validators.pattern(validateImageUrl)]);

        this.insertForm = this.fb.group({
            'name': this.name,
            'price': this.price,
            'description': this.description,
            'imageUrl': this.imageUrl,
            'outOfStock': true,
        });

        this._name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
        this._price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
        this._description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
        this._imageUrl = new FormControl('', [Validators.pattern(validateImageUrl)]);
        this._id = new FormControl();

        this.updateForm = this.fb.group(
            {
                'id': this._id,
                'name': this._name,
                'price': this._price,
                'description': this._description,
                'imageUrl': this._imageUrl,
                'outOfStock': true
            });
    }

    onAddProduct() {
        this.modalRef = this.modalService.show(this.modal);
    }

    onSubmit() {
        let newProduct = this.insertForm.value;

        this.productservice.insertProduct(newProduct).subscribe(
            result => {
                this.productservice.clearCache();
                this.products$ = this.productservice.getProducts();

                this.products$.subscribe(newlist => {
                    this.products = newlist;
                    this.modalRef.hide();
                    this.insertForm.reset();
                    this.rerender();

                });
                console.log("New Product added");

            },
            error => console.log('Could not add Product')

        )

    }

    rerender() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first in the current context
            dtInstance.destroy();

            // Call the dtTrigger to rerender again
            this.dtTrigger.next();

        });
    }

    onUpdate() {
        let editProduct = this.updateForm.value;
        this.productservice.updateProduct(editProduct.id, editProduct).subscribe(
            result => {
                console.log('Product Updated');
                this.productservice.clearCache();
                this.products$ = this.productservice.getProducts();
                this.products$.subscribe(updatedlist => {
                    this.products = updatedlist;

                    this.modalRef.hide();
                    this.rerender();
                });
            },
            error => console.log('Could Not Update Product')
        )
    }

    onUpdateModal(productEdit: Product): void {
        this._id.setValue(productEdit.productId);
        this._name.setValue(productEdit.name);
        this._price.setValue(productEdit.price);
        this._description.setValue(productEdit.description);
        this._imageUrl.setValue(productEdit.imageUrl);

        this.updateForm.setValue({
            'id': this._id.value,
            'name': this._name.value,
            'price': this._price.value,
            'description': this._description.value,
            'imageUrl': this._imageUrl.value,
            'outOfStock': true
        });

        this.modalRef = this.modalService.show(this.editmodal);

    }

    onDelete(product: Product): void {
        this.productservice.deleteProduct(product.productId).subscribe(result => {
            this.productservice.clearCache();
            this.products$ = this.productservice.getProducts();
            this.products$.subscribe(newlist => {
                this.products = newlist;

                this.rerender();
            })
        })
    }

    onSelect(product: Product): void {
        this.selectedProduct = product;

        this.router.navigateByUrl("/products/" + product.productId);
    }

    ngOnDestroy() {
        // Do not forget to unsubscribe
        this.dtTrigger.unsubscribe();
    }

}
