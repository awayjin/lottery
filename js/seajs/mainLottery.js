seajs.config({
    base: "./js"
})

/*
seajs.use("./js/test", function(test){

    test()
})*/

seajs.use("./js/test", function(test){
    alert(11 + ", " + test)
});

test()