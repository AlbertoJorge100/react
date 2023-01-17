export default class Logger{
    constructor(){

    }
    
    static baseUrl = () => 'http://localhost/shop/public/';

    static url = () => `${this.baseUrl()}api/`;         

    static _url = ( element ) => `${this.baseUrl()}${element}`;
    
    //routes      
    //get productos/all
    static urlProductsAll = () => `${this.url()}products/all`;
    //post products/store
    static urlProductsStore = () => `${this.url()}products/store`;
    //post products/find/{id}
    static urlProductsFind = (id) => `${this.url()}products/find/${id}`;
    //get products/delete/{id}
    static urlProductsDelete = (id) => `${this.url()}products/delete/${id}`;

    //helpers
    static trim_word = (word) => word.substring(0, 35);


}