import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 12000, imageUrl:'./assets/images/a54.jpg', description:"A design inspired by simplicity with a clean camera layout, sleek frame, and premium glass finish means the Galaxy A54 5G looks incredible. In addition, it has excellent photography capabilities with its 50MP AI camera and takes your selfies to the next level with its high-resolution 32MP front-facing camera."},
    { id: 2, name: 'Product 2', price: 18000, imageUrl:'./assets/images/galaxy_buds.jpeg', description:"These are true wireless earbuds, with pro-grade technology for immersive sound like never before."},
    { id: 3, name: 'Product 3', price: 39000, imageUrl:'./assets/images/galaxy_pro_foldable.jpeg', description:"The Flex Hinge, or 'tear-drop' hinge, gets its name from the shape of the AMOLED Infinity Flex Display of the Galaxy devices when folded – placing less stress on the axial plane of the display, while allowing the ends of the panel to close together tighter."},
    { id: 1, name: 'Product 1', price: 15000, imageUrl:'./assets/images/f23.jpeg', description:"The Samsung Galaxy F23 is a well-rounded smartphone in terms of its display, software and processing capabilities. The battery life is above average and the cameras work well under ample sunlight."},
    { id: 2, name: 'Product 2', price: 30000, imageUrl:'./assets/images/Galaxy_Tab_A8_.jpg', description:"The Samsung Galaxy Tab A8 is a budget Android tablet computer and part of the Samsung Galaxy Tab series designed by Samsung Electronics. Samsung Galaxy Tab A8. Also known as. Samsung Galaxy Tab A8"},
    { id: 3, name: 'Product 3', price: 60000, imageUrl:'./assets/images/watch4.jpg', description:"Your Samsung Galaxy Watch comes with a range of great features and functions from tracking your activity and heart rate, to replying to emails or listening to music."}
    
  ];

  getProducts(): Product[] {
    return this.products;
  }
}

