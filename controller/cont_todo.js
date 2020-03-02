const { Todo } = require('../models')


class Controller {
    static post_todos(request, response){
        
    Todo.create(request.body)
    .then(result=>{
        response.status(201).json(result)
    })
    .catch(err=>{
        if(err){
        
            let arrays = []
            for (let i = 0; i < err.errors.length ; i++){
                arrays.push(err.errors[i].message)
            }
            response.status(400).json(arrays)
        }else{
            response.status(500).json(err)
        }
    })
    
    }
    
    static getTodos (request,response){
        Todo.findAll()
        .then(result=>{
            response.status(200).json(result)
        })
        .catch(err =>{
            response.status(500).json(err)
        })
    }

    static getTodosById (request,response){
        let Pk = Number(request.params.id)
        console.log(Pk,'ini primary key')
        Todo.findByPk(Pk)
        .then(result=>{
            if (!result){
                let obh={
                    msg:"data tidak ditemukan"
                }
            response.status(404).json(obh)
            }            
            response.status(200).json(result)

        })
        .catch(err=>{
           
            response.status(404).json(err)
        })
    }

    static putTodos (request,response){
        let id = request.params.id
        let obj = request.body
        Todo.update(obj,{where:{id:id}})
        .then(result=>{
            if(result[0]){
                response.status(200).json(obj)
            }else{
                response.status(404).json("not found")
            }
        })
        .catch(err=>{
            if (err){
                let arrays = []
                for (let i = 0; i < err.errors.length ; i++){
                    arrays.push(err.errors[i].message)
                }
                response.status(400).json(arrays)
            }
            else{
                response.status(500).json(err)
            }
        })
    }

    static deleteTodos (request,response){
        let id = request.params.id
        let data = null
        Todo.findByPk(id)
        .then(result=>{
            data=result
            if (result){
                return Todo.destroy({where:{id}})    
            }else{
                response.status(404).json('data not found')
            }
        })
        .then(res=>{
            console.log(res,'ini res delete')
            let send = [data,'data telah dihapus']
            // data.msg="telah berhasil dihapus"
            console.log(res)
                response.status(200).json(send)
        })
        .catch(err=>{
            response.status(500).json(err)
        })
    }


}


module.exports=Controller