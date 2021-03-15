import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import jquery from 'jquery';
// global.jquery = jquery;

import { gsap } from 'gsap';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

global.gsap = gsap;

gsap.defaults({
	overwrite: 'auto',
});

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}



var app = new Vue({
    el: '#app',
    message: "Hello Vue",
    data: {
      basket: [
          {
              img: "img/jacket.png",
              name: "Amet minim mollit non deserunt ullamco est sit",
              count: 1,
              price: 525,              
          },
          {
            img: "img/sneakers.png",
            name: "Amet minim mollit non",
            count: 1,
            price: 525
        }
      ],
      paymethod: "credit_card",
      promocode: "",      
      tax: 100,
      shipping: 150,
      discount: 0,
      subTotal: 0,
      maxCount: 100,
      isSidebarVisibleMobile: false
    },
    methods: {
        deleteItem: function(index) {
            if (window.confirm('You really want to delete "' + this.basket[index].name + '"?'))
                this.basket.splice(index, 1);
        },
        minusCount: function(index) {
            this.basket[index].count--;
            if (this.basket[index].count <= 0) {
                if (window.confirm('You really want to delete "' + this.basket[index].name + '"?'))
                    this.basket.splice(index, 1);
                else
                    this.basket[index].count = 1;            
            }                   
        },
        plusCount: function(index) {
            this.basket[index].count++;
            if (this.basket[index].count > this.maxCount) {
                alert("Sorry, but you cannot order more than "+ this.maxCount + " items");
                this.basket[index].count = 100;
            }
        },
        applyPromocode: function() {
            if (this.promocode === "PROMO") {
                this.discount = 25;
            } else {
                alert("Promocode is not valid");
            }
        },
        checkCount: function(index) {
            if (this.basket[index].count <= 0) {
                if (window.confirm('You really want to delete "' + this.basket[index].name + '"?'))
                    this.basket.splice(index, 1);
                else
                    this.basket[index].count = 1;            
            }      

            if (this.basket[index].count > this.maxCount) {
                alert("Sorry, but you cannot order more than "+ this.maxCount + " items");
                this.basket[index].count = 100;
            }
        }
    },
    computed: {
        getSubtotal: function() {
            sum = 0;
            for (var i = 0, sum = 0; i < this.basket.length; i++) {
                sum += this.basket[i].price * this.basket[i].count;                
            }   
            this.subTotal = sum;
            return sum.toLocaleString('ru-RU');
        },
        getTotal: function() {
            return (this.subTotal + this.tax + this.shipping - this.discount).toLocaleString('ru-RU');
        },
        
    },
  })