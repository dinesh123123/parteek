// import  database and modules
const conn =require("../dbConnection");
//const session = require('express-session');
//const auth=require("../middlewere/admin_auth");




// category operation start

//create categorys list for addmin pannel
const Categorylist=(req,res)=>{
  let sql = "SELECT * FROM category_table";
         let query =conn.query(sql, (err, results) =>{
           if(err) throw err;
            if(results.length ==null){
            return  res.redirect("/public/category");/*json({
                     "result":"false",
                     "message":"result does not found"
               });*/
           }else{
               res.status(200).render("game_category",{
                 "result":"true",
                   "message":"all data",
                    "path": "https://mivizy.kuchvkharido.xyz/uploads/",
                      "data":results
                 });
              }    
     })

};



// create   category  api
const Category=(req,res)=>{
const category_name=req.body.category_name;
const file=req.file;
if (!file) {
      return res.status(400).redirect("/public/create_category");/*({ message: 'Please upload a file.' });*/
   }else{
var sql = "INSERT INTO `category_table`(`category_name`,`image`) VALUES('" + category_name + "','" + req.file.filename + "')";
var query = conn.query(sql, function(err, result) {
                    if(err) throw err;
                      res.status(200).redirect("/public/category");/*json({
                        "result":true,
                         "message":"add secussfully", 
                
                       });*/
                    });
                }
                 };
         
         
         
   // create category delete api
const CategoryDelete=(req,res)=>{
  let sql = "DELETE FROM category_table WHERE category_id="+req.params.category_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/category");
      /*"result":true,
       "message":"deleted sucessfully",
      
      });*/
  });
};    



// create update category api
  const CategoryUpdate=(req,res)=>{
    const category_name = req.body.category_name;
    const category_id =req.body.category_id;
    if(req.file){
     let sql = "UPDATE category_table SET category_name='"+category_name+"',image='"+req.file.filename+"' WHERE category_id="+req.params.category_id;
  let query = conn.query(sql, (err,data) => {
    if(err) throw err;
  return  res.redirect("/public/category");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

}else{

  let sql = "UPDATE category_table SET category_name='"+category_name+"'WHERE category_id="+req.params.category_id;
  let query = conn.query(sql, (err,data) => {
    if(err) throw err;
  return  res.redirect("/public/category");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

}
  
};





// create update category api using get method
const Updatecategory=(req,res)=>{
  const category_id =req.params.category_id ;
let sql = "SELECT * FROM category_table WHERE category_id =?";
  var query=conn.query(sql,[category_id],(err,data)=>{
    if(err) throw err;
               res.render("edit_category",{data:data})
          
      })
  };
  




//end category operation
// start banner operation


  // create get all banner list data api
  const BannerList=(req,res)=>{
    let sql = "SELECT * FROM banner_table";
         let query = conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).render("banner",{
                 "result":true,
                   "message":"all data",
                   "path": "http://103.104.74.215:3055/uploads/",
                      "data": results
                    });
                 })
            };                    





// create delete banner api
 const BannerDelete=(req, res) => {
  let sql = "DELETE FROM banner_table WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/banner_list");/*json({
      "result":true,
       "message":"deleted sucessfully",
      
      });*/
  });
};



  
  
  

// create update banner api
  const BannerUpdate=(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const title=req.body. title;
    const date=req.body.date;

   
     if(req.file){
     let sql = "UPDATE banner_table SET name='"+name+"',title='"+title+"',image='"+req.file.filename+"',date='"+date+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err,data) => {
    if(err) throw err;
  return  res.redirect("/public/banner_list");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });
  
}else{
  let sql = "UPDATE banner_table SET name='"+name+"',title='"+title+"',date='"+date+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err,data) => {
    if(err) throw err;
  return  res.redirect("/public/banner_list");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

}

  
};





// create update banner api using get method
const Updatebanner=(req,res)=>{
  const id =req.params.id;
let sql = "SELECT * FROM banner_table WHERE id=?";
  var query=conn.query(sql,[id],(err,data)=>{
    if(err) throw err;
               res.render("edit_banner",{data:data})
          
      })
  };

  


// create banner post api 
   const Banner=(req,res)=>{       
   const file = req.file;
   const name=req.body.name;
   const title=req.body.title;
   const date=req.body.date;
   if (!file) {
      return res.status(400).redirect("/public/create_banner");
   }else{
   if(!name || !title)
    return res.status(400).json({
      result:false,
      message:"required parameters are title,name,image"
    });
       else{
           var sql="SELECT name FROM banner_table WHERE name =?";
           let query = conn.query(sql,[name],(err, results) => {
              if (err) throw err;
                if(results[0])
                  return res.status(200).json({
                    "result":false,
                    message:"data allready exixt"
               });
                 else{
var sql = "INSERT INTO `banner_table`(`name`,`title`,`image`,`date`) VALUES('" + name + "','" + title + "','" + req.file.filename + "','" + date + "')";
var query = conn.query(sql, function(err, result) {
                    if(err) throw err;
                      res.status(200).redirect("/public/banner_list");/*json({
                        "result":true,
                         "message":"add secussfully", 
                
                       });*/
                    });
  
                 }
              })
            }
          }
     };


// end banner operation

// start contest operation






// create contest api
const CreateContest = async(req,res)=>{
  const title=req.body.title;
  const winning_prize1=req.body.winning_prize1;
  const winning_prize2=req.body.winning_prize2;
  const winning_prize3=req.body.winning_prize3;
  const winning_prize4=req.body.winning_prize4;
  const winning_prize5=req.body.winning_prize5;
  const winning_prize6=req.body.winning_prize6;
  const winning_prize7=req.body.winning_prize7;
  const winning_prize8=req.body.winning_prize8;
  const winners=req.body.winners;

  const statuss=req.body.statuss;
  var sql = "INSERT INTO `contest_table`(`title`,`statuss`,`winning_prize1`,`winning_prize2`,`winning_prize3`,`winning_prize4`,`winning_prize5`,`winning_prize6`,`winning_prize7`,`winning_prize8`,`winners`) VALUES('" +title + "','" +statuss + "','" +winning_prize1 + "','" +winning_prize2 + "','" +winning_prize3 + "','" +winning_prize4 + "','" +winning_prize5 + "','" +winning_prize6 + "','" +winning_prize7 + "','" +winning_prize8 + "','" +winners + "')";
    const query = conn.query(sql,(err, data) => {
    if(err) throw err;
    
        res.status(200).redirect("/public/contest_list");/*json({
        "result":true,
        "message":"add secussfully",
        "data":{
          contest_id:data.insertId,title,status
        }   
    });*/
    
 });
   
};





//create contest list  api
const contestLlist=async(req,res)=>{
let sql = "SELECT * FROM contest_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).render("contest_list",{
                 "result":true,
                   "message":"all data",
                      "data": results
                    });
           })

};


// create  delete contest api
const ContestDelete=async(req,res)=>{
  let sql = "DELETE FROM contest_table WHERE contest_id="+req.params.contest_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/contest_list");
      /*"result":true,
       "message":"deleted sucessfully",
      
      });*/
  });
};





// create update contest and condiction api using get method
const Update_contest=async(req,res)=>{
  const id=req.params.contest_id ;
let sql = "SELECT * FROM contest_table WHERE contest_id =?";
  var query=conn.query(sql,[id],(err,data)=>{
    if(err) throw err;
               res.render("edit_contest",{data:data})
          
      })
  };
  
  
  

// update contest
const contest_Update=async(req,res)=>{
const title=req.body.title;

const winning_prize1=req.body.winning_prize1;
const winning_prize2=req.body.winning_prize2;
const winning_prize3=req.body.winning_prize3;
const winning_prize4=req.body.winning_prize4;
  const winning_prize5=req.body.winning_prize5;
  const winning_prize6=req.body.winning_prize6;
  const winning_prize7=req.body.winning_prize7;
  const winning_prize8=req.body.winning_prize8;
const winners=req.body.winners;
const id=req.body.contest_id;
let sql = "UPDATE contest_table  SET title='"+title+"',winning_prize1='"+winning_prize1+"',winning_prize2='"+winning_prize2+"',winning_prize3='"+winning_prize3+"',winning_prize4='"+winning_prize4+"',winning_prize5='"+winning_prize5+"',winning_prize6='"+winning_prize6+"',winning_prize7='"+winning_prize7+"',winning_prize8='"+winning_prize8+"',winners='"+winners+"' WHERE contest_id="+req.params.contest_id;
let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     return  res.redirect("/public/contest_list");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

};





/*// create  correct answer calculation api 
const contest_Updatestatus = async (req, res) => {
  const contest_id = req.params.contest_id;
  if (!contest_id ) {
    return res.status(200).json({ "result": "false", "message": "contest_id  required" })
  }
  
  
  // update status of question after contest close
    let s=1;
    var sql = "UPDATE question_table  SET status="+s+" WHERE contest_id="+contest_id;
    var query = conn.query(sql, (err, data) => {
    if (err) throw err; //
  
  

// find correct answer
  let sql = "SELECT * FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer WHERE a.contest_id="+contest_id+" GROUP by q.question_id";
  conn.query(sql, (err, data) => {
//console.log(data)



   // for loop use for get question_id start
    for (let i = 0; i < data.length; i++) {
      const questionID = data[i].question_id;

     // console.log(questionID)

      if (questionID) {
       let sql = "SELECT * FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer WHERE a.question_id=" + questionID+" AND a.contest_id="+contest_id;
       let query = conn.query(sql, (err, data) => {
         if (err) throw err;
         // find total correct answer
         var total_correct_answer = 0;
         var falses = 0;
         // for loop start
         for (let i = 0; i < data.length; i++) {
           if (data[i] == "correct_answer") {
             falses += 1;
           } else {
             total_correct_answer += 1;
           }
         }

         // calculate answer
         var all_coins = data[0].total_coins;
         var t_answers = total_correct_answer;
         var cons = all_coins /= t_answers;
         //one user won coins
         var won_user = cons;

         // update won coins in attempt table 
         let sql = "UPDATE attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer SET coins=" + won_user + " WHERE a.question_id=" + questionID+" AND a.contest_id="+contest_id;
         let query = conn.query(sql, (err, data) => {
           if (err) throw err;


           let sql = "SELECT a.* FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer WHERE a.contest_id="+contest_id;
           let query = conn.query(sql, (err, data) => {
             if (err) throw err;
            // console.log(data)

      // start for loop for get user id           
             for (let i = 0; i < data.length; i++) {
              const userID = data[i].user_id;

            //  console.log(userID)
              if(userID){

                let sql = "SELECT SUM(coins) as ramu FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer WHERE a.user_id="+userID+" AND a.contest_id="+contest_id;
                let query = conn.query(sql, (err, data) => {
                 if (err) throw err;

               // console.log(data);
                 let sql = "Update attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer Set coins = "+data[0].ramu+" WHERE a.user_id="+userID+" AND a.contest_id="+contest_id;
                 let query = conn.query(sql, (err, data) => {
                   if (err) throw err;
                 })
               })
              }
            } //second loop end
          })
         })
       })
     } 
    }// end first loop
 
//update 
const status=req.body.status;
var sql="SELECT * FROM contest_table WHERE contest_id="+contest_id;
var query = conn.query(sql,[contest_id],(err, data) => {
              if (err) throw err; 
              if(data[0].status==1){
                const dinu=0;
let sql = "UPDATE contest_table  SET status='"+dinu+"' WHERE contest_id="+contest_id;
let query = conn.query(sql, (err, data) => {
    if(err) throw err;
     return  res.redirect("/public/contest_list");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
 
 /* });
}else{
  return  res.redirect("/public/contest_list");
 };
})

   })
  })
    
 };

*/









// create  correct answer calculation api 
const contest_Updatestatus = async (req, res) => {
  const contestId=req.params.contest_id;
  
 // apply validation 
var sql="SELECT * FROM question_table  WHERE contest_id="+contestId;
var query=conn.query(sql,(err,data)=>{
  if(err)throw err;
  console.log(data)
  var countnull=0;
  var notnull=0;
  for(let i=0;i<data.length;i++){
    if(data[i].status==0){
      notnull+=1;
    }else if(data[i].correct_answer==null){
      countnull+=1;
    }else{}

     }

if(countnull==0 && notnull==0){
     var sql = "UPDATE contest_table  SET statuss='"+1+"' WHERE contest_id="+contestId;
     var query = conn.query(sql, (err, data) => {
     if(err) throw err;
   });
  
    
  
  
  
  
  
 //update  contest status    
//var sql="SELECT * FROM contest_table WHERE contest_id="+contestId;
//var query = conn.query(sql,(err, data) => {
 //             if (err) throw err; 
   //           if(data[0].status==1){
//    var sql = "UPDATE contest_table  SET status='"+0+"' WHERE contest_id="+contestId;
//var query = conn.query(sql, (err, data) => {
 //   if(err) throw err;
 // });
            
            
               
// find first second and third prize from contest table
  var sql="SELECT * FROM contest_table WHERE contest_id="+contestId;
  var query=conn.query(sql,(err,data)=>{
    if(err)throw err;
    
    const f_prize=data[0].winning_prize1;
    const s_prize=data[0].winning_prize2;
    const t_prize=data[0].winning_prize3;
    const four=data[0].winning_prize4;
    const five=data[0].winning_prize5;
    const six=data[0].winning_prize6;
    const seven=data[0].winning_prize7;
    const eight=data[0].winning_prize8;
    
    
    
// firstly find winners list from leader board table
let sql ="SELECT * FROM leader_board_table WHERE contest_id="+contestId;
let query=conn.query(sql,(err,data)=>{
  if(err)throw err;
var firstn=0;
var secondn=0;
var thirdn=0;
var fourth=0;
var fiveth=0;
var sixth=0;
var seventh=0;
var eightth=0;


// calculate prize
 var a=Number(f_prize);
 var b=Number(s_prize);
 var c=Number(t_prize);
 var d=Number(four);
 var e=Number(five);
 var f=Number(six);
 var g=Number(seven);
 var h=Number(eight);
 var i=Math.round((a+b+c+d+e+f+g+h)/8);
 var j=Math.round((a+b+c+d+e+f+g)/7);
 var l=Math.round((a+b+c+d+e+f)/6);
 var m=Math.round((a+b+c+d+e)/5);
 var n=Math.round((a+b+c+d)/4);
 var o=Math.round((a+b+c)/3);
 var p=Math.round((a+b)/2);


 var q=Math.round((b+c+d+e+f+g+h)/7);
 var r=Math.round((b+c+d+e+f+g)/6);
 var s=Math.round((b+c+d+e+f)/5);
 var t=Math.round((b+c+d+e)/4);
 var u=Math.round((b+c+d)/3);
 var v=Math.round((b+c)/2);


var k=Math.round((c+d+e+f+g+h)/6);
var w=Math.round((c+d+e+f+g)/5);
 var x=Math.round((c+d+e+f)/4);
 var y=Math.round((c+d+e)/3);
 var z=Math.round((c+d)/2);


 var za=Math.round((d+e+f+g+h)/5);
 var zb=Math.round((d+e+f+g)/4);
 var zc=Math.round((d+e+f)/3);
 var zd=Math.round((d+e)/2);
 
 
 var xa=Math.round((e+f+g+h)/4);
 var xb=Math.round((e+f+g)/3);
 var xc=Math.round((e+f)/2);
 
 

 var ya=Math.round((f+g+h)/3);
 var yb=Math.round((f+g)/2);

 var aa=Math.round((g+h)/2);
 
 
 
 
 

  
  for(let i=0;i<data.length; i++){
    if(data[i].position=="1"){
      const first=firstn+=1;
    }
}

if(8==firstn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+i+"' WHERE position="+1+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else if(7==firstn){
     var sql = "UPDATE leader_board_table  SET won_voucher='"+j+"' WHERE  position="+1+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(6==firstn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+l+"' WHERE  position="+1+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(5==firstn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+m+"' WHERE  position="+1+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(4==firstn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+n+"' WHERE  position="+1+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(3==firstn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+o+"' WHERE  position="+1+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(2==firstn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+p+"' WHERE  position="+1+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(1==firstn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+a+"' WHERE  position="+1+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else{}//end here first rank


for(let i=0;i<data.length; i++){
    if(data[i].position=="2"){
      const second=secondn+=1;
    }
}


if(7==secondn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+q+"' WHERE position="+2+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else if(6==secondn){
     var sql = "UPDATE leader_board_table  SET won_voucher='"+r+"' WHERE  position="+2+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(5==secondn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+s+"' WHERE  position="+2+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(4==secondn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+t+"' WHERE  position="+2+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(3==secondn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+u+"' WHERE  position="+2+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(2==secondn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+v+"' WHERE  position="+2+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(1==secondn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+b+"' WHERE  position="+2+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else{}//end here second rank



for(let i=0;i<data.length; i++){
    if(data[i].position=="3"){
      const third=thirdn+=1;
    }
}


if(6==thirdn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+k+"' WHERE position="+3+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else if(5==thirdn){
     var sql = "UPDATE leader_board_table  SET won_voucher='"+w+"' WHERE  position="+3+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(4==thirdn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+x+"' WHERE  position="+3+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(3==thirdn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+y+"' WHERE  position="+3+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(2==thirdn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+z+"' WHERE  position="+3+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(1==thirdn){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+c+"' WHERE  position="+3+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else{}//end here third rank



 for(let i=0;i<data.length; i++){
    if(data[i].position=="4"){
      const four=fourth+=1;
    }
}


if(5==fourth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+za+"' WHERE position="+4+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else if(4==fourth){
     var sql = "UPDATE leader_board_table  SET won_voucher='"+zb+"' WHERE  position="+4+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(3==fourth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+zc+"' WHERE  position="+4+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(2==fourth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+zd+"' WHERE  position="+4+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(1==fourth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+d+"' WHERE  position="+4+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else{}//end here fouth rank



for(let i=0;i<data.length; i++){
    if(data[i].position=="5"){
      const five=fiveth+=1;
    }
}


if(4==fiveth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+xa+"' WHERE position="+5+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else if(3==fiveth){
     var sql = "UPDATE leader_board_table  SET won_voucher='"+xb+"' WHERE  position="+5+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(2==fiveth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+xc+"' WHERE  position="+5+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(1==fiveth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+e+"' WHERE  position="+5+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else{}//end here fiveth rank




for(let i=0;i<data.length; i++){
    if(data[i].position=="6"){
      const six=sixth+=1;
    }
}


if(3==sixth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+ya+"' WHERE position="+6+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else if(2==sixth){
     var sql = "UPDATE leader_board_table  SET won_voucher='"+yb+"' WHERE  position="+6+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else if(1==sixth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+f+"' WHERE  position="+6+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else{}//end here sixth rank




for(let i=0;i<data.length; i++){
    if(data[i].position=="7"){
      const seven=seventh+=1;
    }
}


if(2==seventh){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+aa+"' WHERE position="+7+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else if(1==seventh){
     var sql = "UPDATE leader_board_table  SET won_voucher='"+g+"' WHERE  position="+7+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })


}else{}//end here seventh rank



for(let i=0;i<data.length; i++){
    if(data[i].position=="8"){
      const eight=eightth+=1;
    }
}


if(1==eightth){
    var sql = "UPDATE leader_board_table  SET won_voucher='"+h+"' WHERE position="+8+" AND contest_id="+contestId;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    })

}else{}//end here eightth rank

   //})
//})
// won voucher calculation end

//won voucher update in user tables on voucher blance field
var sql="SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id=u.id WHERE l.contest_id ="+contestId;
var query = conn.query(sql,(err, data) => {
              if (err) throw err; 
              for(let i=0;i<data.length;i++){
                const rada=data[i].user_id;
                const rani=data[i].id;
                const y=Number(data[i].won_voucher);
                 const x=Number(data[i].voucher_blance);
                 const z=x+y;
                // console.log(z)

if(rada==rani){
        // update won_voucher in user  table 
       var sql = "UPDATE user_table u INNER JOIN leader_board_table l ON u.id=l.user_id SET voucher_blance=" + z + " WHERE u.id="+rani+" AND l.contest_id=" + contestId;
        var query = conn.query(sql, (err, data) => {
        if (err) throw err;
     });
 }else{}
      
       }
       
})
})
     });// end here

  return  res.redirect("/public/contest_list");
 }
 
else{
  return  res.send("Please close all questions of the this contest");
  
  }
//}
 }) //end validation api

 };






















// end contest operation
// start question operation

// create get all questions api
const AllQuestion=async(req,res)=>{
  let sql = "SELECT * FROM question_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).render("question",{
                 "result":true,
                   "message":"all data",
                   "path": "http://103.104.74.215:3055/uploads/",
                      "data": results
                    });
                 })

         };


// create update question api using get method
const Updatequestion=async(req,res)=>{
  const question_id=req.params.question_id;
var sql = "SELECT * FROM category_table";
         var query = conn.query(sql, (err, data) =>{
           if(err) throw err;


           var sql = "SELECT * FROM contest_table WHERE statuss="+0;
        var query = conn.query(sql, (err, result) =>{
           if(err) throw err;

var dinu=data;
var din=result;
var dii=[...dinu,...din];
 
  let sql = "SELECT * FROM question_table WHERE question_id =?";
  var query=conn.query(sql,[question_id],(err,radha)=>{
    if(err) throw err;  
             
var dashing=radha;
var dropdownlist=[...dashing,...dii];

var tt=dropdownlist[0].contest_id;
console.log(tt)
               res.render("edit_question",{data:dropdownlist})
               //console.log(data)
          })
          })
         
      })
  };









// create question delete api
   const QuestionDelete=(req, res) => {
  let sql = "DELETE FROM question_table WHERE question_id="+req.params.question_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/question_list");/*{
      "result":true,
       "message":"deleted sucessfully",
      
      });*/
  });
};





// create update question api
const QuestionUpdate=async(req,res)=>{
  //const contest_id=req.body.contest_id;
  const category_id=req.body.category_id;
  const question=req.body.question;
  const optiona=req.body.optiona;
  const optionb=req.body.optionb;
  const optionc=req.body.optionc;
  const optiond=req.body.optiond;
  const description=req.body.description;
 // const correct_answer=req.body.correct_answer;
  const{dates,time}=req.body;
  if(req.file){

    var sql = "UPDATE question_table SET category_id='"+category_id+"',question='"+question+"',image='"+req.file.filename+"',optiona='"+optiona+"',optionb='"+optionb+"',optionc='"+optionc+"',optiond='"+optiond+"',dates='"+dates+"',time='"+time+"',description='"+description+"' WHERE question_id="+req.params.question_id;
  var query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).redirect("/public/question_list");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

}
   
else{
 var sql = "UPDATE question_table SET category_id='"+category_id+"',question='"+question+"',optiona='"+optiona+"',optionb='"+optionb+"',optionc='"+optionc+"',optiond='"+optiond+"',dates='"+dates+"',time='"+time+"',description='"+description+"' WHERE question_id="+req.params.question_id;
   var query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).redirect("/public/question_list");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/

   })

 }

var expire_date='';
const question_id =req.params.question_id ;
var sql = "SELECT * FROM question_table WHERE question_id =?";
  var query=conn.query(sql,[question_id],(err,data)=>{
    if(err) throw err;

    const a=data[0].dates;
    const b=data[0].time,
expire_date = a.concat(" ").concat(b);
var sql = "UPDATE question_table SET expire_date='"+expire_date+"' WHERE question_id="+req.params.question_id;
   var query = conn.query(sql, (err, results) => {
    if(err) throw err;
    
   })
   

   })
 
 };








// create question post api
const Question =async(req,res)=>{
  //const category=req.body.category;
  const{dates,time}=req.body;
  const question=req.body.question;
   const optiona=req.body.optiona;
   const optionb=req.body.optionb;
    const optionc=req.body.optionc;
     const optiond=req.body.optiond;
      const description=req.body.description;
      const category_id=req.body.category_id;
       const contest_id=req.body.contest_id;
      // const expire_date=req.body.expire_date;

       var sql="SELECT * FROM contest_table WHERE statuss="+1+" AND contest_id="+contest_id;
       var query=conn.query(sql,(err,data)=>{
        if(err)throw err;
      if(data.length>0){
        return res.send("Invalid Contest  name Please Select a valid contest name")
      }else{
      var expire_date=dates.concat(" ").concat(time);
         var sql = "INSERT INTO `question_table`(`question`,`optiona`,`optionb`,`optionc`,`optiond`,`category_id`,`contest_id`,`expire_date`,`dates`,`time`,`description`,`image`) VALUES('"+question+"','"+optiona+"','"+optionb+"','"+optionc+"','"+optiond+"','"+category_id+"','"+contest_id+"','"+expire_date+"','"+dates+"','"+time+"','"+description+"','"+req.file.filename+"')";
          var query = conn.query(sql, function(err, data) {
            console.log(expire_date)
           
            if(err) throw err;
               res.status(200).redirect("/public/question_list");/*{
                 "result":true,
                  "message":"add secussfully",
                  data:{
                    id:result.insertId,
                    question,category_id,optionb,
                    optiona
                  }
                 
           });*/
       });
        }
      })
};










// create update question api
const UpdateQuestions=async(req,res)=>{
  const correct_answer=req.body.correct_answer;
    let sql = "UPDATE question_table SET correct_answer='"+correct_answer+"' WHERE question_id="+req.params.question_id;
  let query = conn.query(sql, (err, results) => {

    if(err) throw err;
    res.status(200).redirect("/public/question_list");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/

   })
};



// create update question api
const updateCorrect_answerPage=async(req,res)=>{
  const question_id =req.params.question_id ;
let sql = "SELECT * FROM question_table WHERE question_id =?";
  var query=conn.query(sql,[question_id],(err,data)=>{
    if(err) throw err;
               res.render("edit_correct_answer",{data:data})
          
      })
  
};

















//end question operations



// create privacy policy api 
const Privacy=async (req,res)=>{
 const data = {title,text}=req.body;
   if(!title || !text)
    return res.status(400).json({
      result:false,
      message:"required parameters are title,text"
    });
       else{
           var sql="SELECT title FROM privacy_policy_table WHERE title =?";
           let query = conn.query(sql,[title],(err, results) => {
              if (err) throw err;
                if(results[0])
                  return res.status(200).json({
                    "result":false,
                    message:"title allready exixt"
               });
                 else{
                    const sql = "INSERT INTO privacy_policy_table SET ?";
                    const query = conn.query(sql, data,(err, results) => {
                    if(err) throw err;
                      res.status(200).redirect("/public/privacyList");/*json({
                        "result":true,
                         "message":"add secussfully", 
                         "data": {
                          id:results.insertId,
                          text,title 
                        }
                    });*/
                 });
  
             }
       })
    }
};




// create  update privacy policy  api
const PrivacyUpdate=async(req,res)=>{
const title=req.body.title;
const text=req.body.text;
    let sql = "UPDATE privacy_policy_table  SET title='"+title+"',text='"+text+"'WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).redirect("/public/privacyList");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

};

// create delete privacy policy api
const PrivacyDelete=async(req,res)=>{

 let sql = "DELETE FROM privacy_policy_table  WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/privacyList");/*json({
      "result":true,
       "message":"deleted sucessfully",
      
      });*/
  });

};




// create Privacy and pollicy api using get method
const Updatepollicy=async(req,res)=>{
  const id=req.params.id ;
let sql = "SELECT * FROM privacy_policy_table WHERE id=?";
  var query=conn.query(sql,[id],(err,data)=>{
    if(err) throw err;
               res.render("edit_privacy",{data:data})
          
      })
  };






// create privacy policy api 
const TermsAndCondition=async (req,res)=>{
 const data = {title,text}=req.body;
   if(!title || !text)
    return res.status(400).json({
      result:false,
      message:"required parameters are title,text"
    });
       else{
           var sql="SELECT title FROM terms_and_condition_table WHERE title =?";
           let query = conn.query(sql,[title],(err, results) => {
              if (err) throw err;
                if(results[0])
                  return res.status(200).json({
                    "result":false,
                    message:"title allready exixt"
               });
                 else{
                    const sql = "INSERT INTO terms_and_condition_table SET ?";
                    const query = conn.query(sql, data,(err, results) => {
                    if(err) throw err;
                      res.status(200).redirect("/public/termList");/*json({
                        "result":true,
                         "message":"add secussfully", 
                         "data": {
                          id:results.insertId,
                          text,title 
                        }
                    });*/
                 });
  
             }
       })
    }
};



//create privacy policy list api
const PrivacyList=async(req,res)=>{
let sql = "SELECT * FROM privacy_policy_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).render("privacy_pollicy",{
                 "result":true,
                   "message":"all data",
                      "data": results
                    });
           })

};






// create user list api for admin pannel
const Userlist=async(req,res)=>{
  let sql = "SELECT * FROM user_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).render("user_show",{
                 "result":"true",
                   "message":"all data",
                    "path": "https://mivizy.kuchvkharido.xyz/uploads/",
                      "data":results
                 });
                  }else{
                      res.status(200).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
     })

};


// create find user by using id api
const UserDetail=async(req,res)=>{
  const id=req.params.id;
  let sql = "SELECT * FROM user_table WHERE id =?";
  var query=conn.query(sql,[id],(err,data)=>{
    if(err) throw err;
      res.status(200).render("user_profile",{
      "result":"true",
       "message":"all data",
       data:data
      
      });
  });
};


//create how to trade list api
const HowToTradeList=async(req,res)=>{
let sql = "SELECT * FROM howto_trade_table";
         let query =await conn.query(sql, (err, data) =>{
           if(err) throw err;
               res.status(200).render("how_to_trade",{
                 "result":true,
                   "message":"all data",
                      "data":data
                    });
           })

};




// create how to trade api 
  const HowToTrade=async(req,res)=>{
  const title=req.body.title;
  const text=req.body.text;
  const sql = "INSERT INTO `howto_trade_table`(`title`,`text`) VALUES('" + req.body.title + "','" + req.body.text + "')";
  const query = conn.query(sql,(err, results) => {
  if(err) throw err;
  res.status(200).redirect("/public/tradeList");
     });
  
};




// create delete api
const HowToTradeDelete=async(req,res)=>{
 let sql = "DELETE FROM howto_trade_table WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/tradeList");/*json({
      "result":true,
       "message":"deleted sucessfully",
      
      });*/
  });

};







// create  update api
const HowToTradeUpdate=async(req,res)=>{
const title=req.body.title;
const text=req.body.text;
    let sql = "UPDATE howto_trade_table SET title='"+title+"',text='"+text+"'WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).redirect("/public/tradeList");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

};





// create update term and condiction api using get method
const UpdateHowToTrade=async(req,res)=>{
  const id =req.params.id ;
let sql = "SELECT * FROM howto_trade_table WHERE id =?";
  var query=conn.query(sql,[id],(err,data)=>{
    if(err) throw err;
               res.render("edit_howto_trade",{data:data})
          
      })
  };
  
  





// create  contactus  api
const ContactUs=async(req,res)=>{
const data={clint_name,mobile,email,address}=req.body;
const sql = "INSERT INTO contact_us_table SET ?";
    const query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
        res.status(200).json({
        "result":true,
        "message":"add secussfully",
        "data":{
          id:results.insertId,clint_name,mobile,email,address
        }   
    });
 });
};




//create contact list api
const ContactList=async(req,res)=>{
let sql = "SELECT * FROM contact_us_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).render("contact",{
                 "result":true,
                   "message":"all data",
                      "data": results
                    });
           })

};


// create contest update api
const ContactUpdate=async(req,res)=>{
const clint_name=req.body.clint_name;
const mobile=req.body.mobile;
const email=req.body.email;
const id=req.body.id;
    let sql = "UPDATE contact_us_table  SET clint_name='"+clint_name+"',mobile='"+mobile+"',email='"+email+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).redirect("/public/contactList");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

};



  // create update contact api using get method
const Contactupdate=async(req,res)=>{
  const id=req.params.id;
let sql = "SELECT * FROM contact_us_table WHERE id =?";
  var query=conn.query(sql,[id],(err,data)=>{
    if(err) throw err;
               res.render("edit_contact",{data:data})
          
      })
  }; 
 
 
  
  
  
//create privacy policy list api
const TermsAndConditionList=async(req,res)=>{
let sql = "SELECT * FROM terms_and_condition_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).render("term_condiction",{
                 "result":true,
                   "message":"all data",
                      "data": results
                    });
           })

};


// create  update privacy policy  api
const TermsAndConditionUpdate=async(req,res)=>{
const title=req.body.title;
const text=req.body.text;
const term_id=req.body.term_id
let sql = "UPDATE terms_and_condition_table  SET title='"+req.body.title+"',text='"+req.body.text+"'WHERE term_id="+req.params.term_id;
let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     return  res.redirect("/public/termList");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

};




// create update term and condiction api using get method
const Updateterm=async(req,res)=>{
  const term_id =req.params.term_id ;
let sql = "SELECT * FROM terms_and_condition_table WHERE term_id =?";
  var query=conn.query(sql,[term_id],(err,data)=>{
    if(err) throw err;
               res.render("edit_term_condition",{data:data})
          
      })
  };





// create leader board api
const LeaderBoard=async(req,res)=>{
  const data = {user_id,contest_id,coin,won_voucher,position,created_date}=req.body;
    const sql = "INSERT INTO leader_board_table SET ?";
    const query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
        res.status(200).json({
        "result":true,
        "message":"add secussfully",
        "data":{
          id:results.insertId,position,user_id,contest_id,coin,won_voucher,created_date
        }   
    });
 });
   
};




//admin login api
const AddminLogin=(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;
  const is_verified=req.body.is_verified;
  const id=req.body.id;
  var sql="SELECT * FROM user_table WHERE email='"+email+"' AND password='"+password+"' ";
           let query = conn.query(sql,(err, data) => {
              if (err) throw err;
              if(data.length>0){
              if(data[0].is_verified=="0"){
                res.status(400).render("login",{
                  "result":"false",
                  "message":"password and email was worng",
                 
               });

              }else
               {req.session.id=data[0].id
                  console.log(req.session)
          
                res.status(200).redirect("/public/index");/*{
                  "result":"true",
                  "message":"addmin login secussfully",
              
           })*/
           } 
              }else{
                return res.status(400).render("login",{
                  "result":"false",
                  "message":"password and email was worng",
                 
               });
            }          
        })
  };


// create admin logout api
 const AdminLogout=(req,res) => {
    req.session.destroy();
    res.render('login');
};






// create delete privacy policy api
const TermsAndConditionDelete=async(req,res)=>{
 let sql = "DELETE FROM terms_and_condition_table WHERE term_id="+req.params.term_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/termList");/*json({
      "result":true,
       "message":"deleted sucessfully",
      
      });*/
  });

};




//create faqllist list api
const Faq_List=async(req,res)=>{
let sql = "SELECT * FROM faq_table";
         let query =await conn.query(sql, (err, data) =>{
           if(err) throw err;
               res.status(200).render("faq",{
                 "result":true,
                   "message":"all data",
                      "data":data
                    });
           })

};





// create faq api 
const Faq=async(req,res)=>{
  const title=req.body.title;
  const text=req.body.text;
  const sql = "INSERT INTO `faq_table`(`title`,`text`) VALUES('" + req.body.title + "','" + req.body.text + "')";
  const query = conn.query(sql,(err, results) => {
  if(err) throw err;
  res.status(200).redirect("/public/faq_list");/*json({
                        "result":true,
                         "message":"add secussfully", 
                         "data": {
                          id:results.insertId,
                          text,title 
                        }
                    });*/
                 });
  
      
};






// create  update privacy policy  api
const FaqUpdate=async(req,res)=>{
const title=req.body.title;
const text=req.body.text;
    let sql = "UPDATE faq_table  SET title='"+title+"',text='"+text+"'WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.status(200).redirect("/public/faq_list");/*json({
      "result":true,
       "message":"Update sucessfully",
      
      });*/
  });

};



// create Privacy and pollicy api using get method
const UpdateFaq=async(req,res)=>{
  const id=req.params.id ;
let sql = "SELECT * FROM faq_table WHERE id=?";
  var query=conn.query(sql,[id],(err,data)=>{
    if(err) throw err;
               res.render("edit_faq",{data:data})
          
      })
  };




// create delete faq api
const FaqDelete=async(req,res)=>{

 let sql = "DELETE FROM faq_table  WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/faq_list");/*json({
      "result":true,
       "message":"deleted sucessfully",
      
      });*/
  });

};



//
// create leaderboard user rank list
const leaderboardlist=async(req,res)=>{
  let sql = "SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id=u.id WHERE DATE(l.modified_date) = SUBDATE(CURDATE(),0) ORDER BY position";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
          
               res.status(200).render("leader_board",{
                 "result":"true",
                   "message":"all data",
                    "path": "https://mivizy.kuchvkharido.xyz/uploads/",
                      "data":results
                 });
                  
     })

};



// create privacy page api file
const PrizeDistribuction=(req,res)=>{
  const id =req.params.user_id;
let sql = "SELECT * FROM leader_board_table WHERE id=?";
  var query=conn.query(sql,[id],(err,data)=>{
    if(err) throw err;
               res.render("prize_distribuction",{data:data})
          
      })
  };





// create   category  api
const Wonvoucher=async(req,res)=>{
const won_voucher=req.body.won_voucher;
const id=req.body.user_id;
var sql = "UPDATE leader_board_table  SET won_voucher='"+req.body.won_voucher+"' WHERE user_id="+req.params.user_id;
var query = conn.query(sql, (err, data) => {
    if(err) throw err;
    

var sql="SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id=u.id WHERE l.user_id="+req.params.user_id;
var query = conn.query(sql,(err, data) => {
              if (err) throw err; 
              
 const x = Number(data[0].voucher_blance);
 const y=Number(won_voucher);
 const z=x+y;
//const id=req.body.user_id;
 // update won_voucher in user  table 
        let sql = "UPDATE user_table u INNER JOIN leader_board_table l ON u.id=l.user_id SET voucher_blance=" + z + " WHERE user_id=" + req.params.user_id;
        let query = conn.query(sql, (err, data) => {
          if (err) throw err;
     });
   });
    return  res.redirect("/public/leader_board");
 });
 

};
         







// create leaderboard user rank list
const amount_requestlist=async(req,res)=>{
  let sql = "SELECT * FROM voucher_table v INNER JOIN user_table u ON v.user_id=u.id";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).render("amount_request",{
                 "result":"true",
                   "message":"all data",
                    "path": "https://mivizy.kuchvkharido.xyz/uploads/",
                      "data":results
                 });
                  }else{
                      res.status(400).render("contest_listss",{
                     "result":"false",
                     "message":"result does not found"
               });
           }
     })

};





// create amount request delete api
const amountRequestDelete=async(req,res)=>{
  const Id=req.params.request_id;
  let sql = "DELETE FROM voucher_table WHERE request_id="+Id;
  console.log(Id)
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.status(200).redirect("/public/amount_request");
      /*"result":true,
       "message":"deleted sucessfully",
      
      });*/
  });
};









//ADDMIN PANNEL CONTROLLERS
// show index page
const IndexPage=(req,res)=>{
  res.render("index")
};

// show create questions pages
const CreateQuestionPage=(req,res)=>{
let sql = "SELECT * FROM category_table ";
         let query = conn.query(sql, (err, data) =>{
           if(err) throw err;
         


let sql = "SELECT * FROM contest_table WHERE statuss="+0;
         let query = conn.query(sql, (err, result) =>{
           if(err) throw err;

var dinu=data;
var din=result;
var dii=[...dinu,...din];


           res.status(200).render("c_question",{
                 "result":true,
                   "message":"all data",
                   "path": "http://103.104.74.215:3055/uploads/",
                      "data":dii
                   
                })
             
            })
          })
       };







// create coins and rank calculation api
const Calculation=(req,res)=>{
   const question_id = req.params.question_id; 
   
   
    // apply validation on correct_answer
   var sql="SELECT * FROM question_table WHERE question_id="+question_id;
   var query=conn.query(sql,(err,data)=>{
    if(err)throw err;
    for(let i=0;i<data.length;i++){
    if(data[i].correct_answer==null){
     return res.status(400).send("please Update firstly correct_answer");
    }else{
   
   
  // update status of question after update answer 
    let s=1;
    var sql = "UPDATE question_table  SET status="+s+" WHERE question_id="+question_id;
    var query = conn.query(sql, (err, data) => {
    if (err) throw err; 

    // find correct answer
  let sql = "SELECT * FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer WHERE q.question_id="+question_id;
  conn.query(sql, (err, data) => {
 
         // find total correct answer
         var total_correct_answer = 0;
         var falses = 0;
         // for loop start
         for (let i = 0; i < data.length; i++) {
           if (data[i] == "correct_answer") {
             falses += 1;
           } else {
             total_correct_answer += 1;
           }
         }



if(total_correct_answer!==0){




         // calculate answer
         var all_coins = data[0].total_coins;
         var t_answers = total_correct_answer;
         var cons = all_coins /= t_answers;
         //one user won coins
         var won_user = cons;

         // update won coins in attempt table 
         let sql = "UPDATE attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer SET coins=" + won_user + " WHERE a.question_id="+question_id;
         let query = conn.query(sql, (err, data) => {
           if (err) throw err;
           
           
           
         })
       }else{}
           
 
           let sql = "SELECT a.* FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer WHERE a.question_id="+question_id;
           let query = conn.query(sql, (err, data) => {
             if (err) throw err;
             //console.log(data)

         // start for loop for get user id           
             for (let i = 0; i < data.length; i++) {
              const userID = data[i].user_id;

             // console.log(userID)
              if(userID){

                let sql = "SELECT SUM(coins) as ramu FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer WHERE a.user_id="+userID;
                let query = conn.query(sql, (err, data) => {
                 if (err) throw err;
                 

               // console.log(data);
                 let sql = "Update attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer Set coins = "+data[0].ramu+" WHERE a.user_id="+userID;
                 let query = conn.query(sql, (err, data) => {
                   if (err) throw err;
                  })
                })
              }
            } //second loop end

//update coins in leader board table

var sql = "SELECT a.* FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer  WHERE a.question_id="+question_id+" GROUP by a.user_id";
var query = conn.query(sql, (err, data) => {
if (err) throw err;
for(i=0;i<data.length;i++){
const dashing=data[i].user_id;
const contest_id=data[i].contest_id;
const co=data[i].coins;

//console.log(data)
var sql = "SELECT * FROM leader_board_table WHERE user_id="+data[i].user_id+" AND contest_id="+contest_id;
  conn.query(sql, (err, data) => {
    if (err) throw err; 
    for (let i = 0; i < data.length; i++) {                     
    const x =Number(data[i].coin);
    const y=Number(co);
     const z=x+y;
 //console.log(z)
 const raja=data[i].user_id;
 //console.log(data[i].contest_id)
 if(raja==dashing){
   // update won coins in attempt table 
         let sql = "UPDATE leader_board_table  SET coin=" + z +" WHERE user_id="+raja+" AND contest_id ="+data[i].contest_id;
         let query = conn.query(sql, (err, data) => {
           if (err) throw err;
   })

   }else{}
 }
   })


  // calculate user rank
var sql = "SELECT * FROM leader_board_table WHERE contest_id="+contest_id;
  conn.query(sql, (err, data) => {
    if (err) throw err; 
    for (let i = 0; i < data.length; i++) {
    const rahul=data[i].contest_id;     
console.log(rahul)
  //console.log(data[i].contest_id)
var sql = "SELECT user_id,coin,RANK()OVER(ORDER BY coin DESC)AS RANK FROM leader_board_table WHERE contest_id="+rahul;
                 var query = conn.query(sql, (err, data) => {
                   if (err) throw err;
                  
                      // start fourth loop
                        for (let i = 0; i < data.length; i++) {
                         const user_ID = data[i].user_id;
                          const p=data[i].RANK;
     
                            if(user_ID){
                             var sql = "Update leader_board_table  Set position = "+data[i].RANK+" WHERE user_id="+user_ID+" AND contest_id="+rahul;
                                 var query = conn.query(sql, (err, data) => {
                                   if (err) throw err;
                                })
                              }
                            }// end fourth loop
                           });
                         }
                      })
                     // end leader board table conis updates and rank
                    }
                  })
                  
                  
                 
//start answer update
var sql="SELECT * FROM question_table WHERE question_id="+question_id;
var query=conn.query(sql,(err,data)=>{
  if(err)throw err;
 

  if(data[0].correct_answer=="a"){
 var sql = "Update question_table  Set correct_answer = '"+data[0].optiona+"'  WHERE question_id="+question_id;
var query = conn.query(sql, (err, data) => {
if (err) throw err;

});


  }else if(data[0].correct_answer=="b"){    
 var sql = "Update question_table  Set correct_answer = '"+data[0].optionb+"'  WHERE question_id="+question_id;
var query = conn.query(sql, (err, data) => {
if (err) throw err;
});


  }
  else if(data[0].correct_answer=="c"){
    var sql = "Update question_table  Set correct_answer = '"+data[0].optionc+"'  WHERE question_id="+question_id;
var query = conn.query(sql, (err, data) => {
if (err) throw err;
});


  }else{
    var sql = "Update question_table  Set correct_answer = '"+data[0].optiond+"'  WHERE question_id="+question_id;
var query = conn.query(sql, (err, data) => {
if (err) throw err;
});

  }

});

// end here answer update


                }) 
            // end first loop
         res.status(200).redirect("/public/question_list");/*json({result:"true",data:data})*/
     });
  });
//});


}
}
 })


};









// creaate amount paymentManagement api
const paymentManagement=async(req,res)=>{
  const userId=req.params.user_id;
  try{
    var sql="SELECT * FROM voucher_table v INNER JOIN user_table u ON v.user_id=u.id WHERE v.status='"+0+"' AND v.user_id="+userId;
    var query=conn.query(sql,(err,data)=>{
      if(err)throw err;
      console.log(data)

      const x=Number(data[0].voucher_blance);
      const y=Number(data[0].amount);
         const sub=Number(x-y);
      console.log(sub)
      console.log(y)
       console.log(x)

        
      if(y<=x){
        var sql="UPDATE user_table SET voucher_blance="+sub+" WHERE id="+userId;
        var query=conn.query(sql,(err,data)=>{
          if(err)throw err;
          
        });
        


         var sql="UPDATE voucher_table SET status="+1+" WHERE user_id="+userId;
        var query=conn.query(sql,(err,data)=>{
          if(err)throw err;
        });

       res.status(200).redirect("/public/amount_request");/*json({result:"true",message:"requested secussfully",data:data})*/


      }else{
        res.send("You have not sufficient blance ")
        
      }


    })

  }catch(error){
    res.status(400).json({result:"false",message:error.message});

  }

};





// create leaderboard user rank list show according to date
const leaderboardlists=async(req,res)=>{
  const {created_date,a,b}=req.body;
  try{

  let sql = "SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id=u.id WHERE l.created_date  BETWEEN '"+req.body.a+"' and '"+req.body.b+"'";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).render("leader_board",{
                 "result":"true",
                   "message":"all data",
                    "path": "https://mivizy.kuchvkharido.xyz/uploads/",
                      "data":results
                 });
                  }else{
                      res.status(400).render("contest_listss",{
                     "result":"false",
                     "message":"result does not found"
               });
           }
     })
       }catch(error){
        res.status(400).json({result:"false",message:error.message})
       }

};













// show create admin login pages
const AdminLoginPage=(req,res)=>{
  res.render("login")
};


// show create csvfilePage pages
const csvfilePage=(req,res)=>{
  res.render("csvfile_upload")
};



// create new file
const BannerPage=(req,res)=>{
  res.render("create_banner")
};


// create banner page api file
const categoryPage=(req,res)=>{
  res.render("create_category")
};


// create contest page api file
const ContestPage=(req,res)=>{
  res.render("create_contest")
};



// create privacy page api file
const PrivacyPage=(req,res)=>{
  res.render("create_pollicy")
};




// create privacy page api file
const TradePage=(req,res)=>{
  res.render("create_trade")
};


// create privacy page api file
const TermPage=(req,res)=>{
  res.render("create_term")
};



// create privacy page api file
const FaqPage=(req,res)=>{
  res.render("create_faq")
};




module.exports={
 AddminLogin,
 Question,
 AllQuestion,
 QuestionUpdate,
 QuestionDelete,
 Banner,
 BannerList,
 BannerUpdate,
 BannerDelete,
 HowToTrade,
 HowToTradeList,
 HowToTradeUpdate,
 HowToTradeDelete,
 Privacy,
 PrivacyList,
 PrivacyUpdate,
 PrivacyDelete,
 TermsAndCondition,
 TermsAndConditionList,
 TermsAndConditionUpdate,
 TermsAndConditionDelete,
 LeaderBoard,
 CreateContest,
 Category,
 ContactUs,
// csvfilePages,
 Categorylist,
 CategoryDelete,
 CategoryUpdate,
 Userlist,
 UserDetail,
 ContactList,
 ContactUpdate,
  contestLlist,
  ContestDelete,
 AdminLogout,
 //EXPORT ADDMIN PANNEL VARIABLES
 IndexPage,
 CreateQuestionPage,
 AdminLoginPage,
 csvfilePage,
 Updatebanner,
 Updatecategory,
 Updatequestion,
 Contactupdate,
 Updateterm,
 UpdateHowToTrade,
 categoryPage,
 BannerPage,
 ContestPage,
 Update_contest,
 contest_Update,
 Updatepollicy,
 PrivacyPage,
 TradePage,
 TermPage,
 Faq_List,
 FaqPage,
 Faq,
 FaqDelete,
 FaqUpdate,
 UpdateFaq,
 contest_Updatestatus,
 leaderboardlist,
 PrizeDistribuction,
 Wonvoucher,
amount_requestlist,
amountRequestDelete,
Calculation,
paymentManagement,
leaderboardlists,
UpdateQuestions,
updateCorrect_answerPage











 
}