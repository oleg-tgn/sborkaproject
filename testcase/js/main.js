var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      basket: [
          {
              img: "img/jacket.png",
              name: "Amet minim mollit non deserunt ullamco est sit",
              count: 1,
              price: 525
          },
          {
            img: "img/sneakers.png",
            name: "Amet minim mollit non",
            count: 1,
            price: 525
        }
      ],
      tax: 100,
      shipping: 150,
      discount: 0,
      subTotal: 0
    },
    methods: {
        deleteItem: function(index) {
            this.basket.splice(index, 1);
        }       
    },
    computed: {
        getSubtotal: function() {
            sum = 0;
            for (var i = 0, sum = 0; i < this.basket.length; i++) {
                sum += this.basket[i].price * this.basket[i].count;                
            }   
            this.subTotal = sum;
            return sum;
        },
        getTotal: function() {
            return this.subTotal + this.tax + this.shipping + this.discount;
        }
    },
    filters: {
        format: val => `${val}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '),
    },
  })