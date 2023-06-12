// import  database and modules
const conn =require("../dbConnection");
const nodemailer = require('nodemailer');
const request = require("request");


// create questions list  api  for android side
const AllQuestion=(req,res)=>{
 let sql = "SELECT * FROM question_table WHERE status="+0;
         let query = conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).json({
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



 // create  banner list  api for android side
  const BannerList=(req,res)=>{
    let sql = "SELECT * FROM banner_table";
         let query = conn.query(sql, (err, results) =>{
           if(err) throw err;
               if(results.length>0){
               res.status(200).json({
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



// create trade list api for andorid side
  const Trade =(req,res)=>{
    let sql = "SELECT * FROM howto_trade_table";
         let query = conn.query(sql, (err, results) =>{
           if(err) throw err;
            if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                      "data": results
                    });
               }else{
                      res.status(200).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
      })

  };



//create privacy policy list api android list
const PrivacyList=(req,res)=>{
let sql = "SELECT * FROM privacy_policy_table ";
         let query = conn.query(sql, (err, results) =>{
           if(err) throw err;
               if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                      "data": results
                    });
               }else{
                      res.status(200).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
      })

  };



//create term and condiction list api android list
const TermList=(req,res)=>{
let sql = "SELECT * FROM terms_and_condition_table ";
         let query = conn.query(sql, (err, results) =>{
           if(err) throw err;
               if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                      "data": results
                    });
               }else{
                      res.status(200).json({
                     "result":"false",
                     "message":"result does not found"
               });
           }
      })

  };








// create user signup with mobile otp api
const UserSignup=(req,res)=>{
const phone=req.body.phone;
const fcm_id=req.body.fcm_id;

 
       if(!phone || !fcm_id){
         res.status(200).json({
        "result":"false",
        "message":"required parameters are phone and fcm_id", 
    });
}
  else{
      
      var otp = Math.floor(1000 + Math.random() * 9000);
  
var options = { method: 'POST',
  url:"https://sms.adservs.co.in/vb/apikey.php?",
  headers: 
   { 'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded'},
  form: 
   { userId: 'pinioo',
     password: 'pinioo@123',
     apikey:'sotyS0QXuNqzpG7j',
     senderid:'ADSRSS',
     msgType: 'text',
     number:req.body.phone,
     message: otp+'{#var#} is your OTP (One Time Password) to login to {#var#} -AdServs',
     duplicateCheck: 'true',
     format: 'json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
      var sql="SELECT * FROM user_table WHERE phone =?";
      let query = conn.query(sql,[phone],(err,results ) => {
     if (err) throw err; 

  let sql = "UPDATE user_table SET otp='"+otp+"',fcm_id='"+fcm_id+"' WHERE phone="+req.body.phone;
  let query = conn.query(sql, (err, result) => {
         if(err) throw err;
  var sql="SELECT * FROM user_table WHERE phone =?";
  let query = conn.query(sql,[phone],(err, data) => {
        if (err) throw err;
         if(data.length>0){
          res.status(200).json({
          "result":"true",
          "message":"User allready register sucessfully",
          data
      });
  
       }else{
           
           
 var otp = Math.floor(1000 + Math.random() * 9000);
 var options = { method: 'POST',
  url:"https://sms.adservs.co.in/vb/apikey.php?",
  headers: 
   { 'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded'},
  form: 
   { userId: 'pinioo',
     password: 'pinioo@123',
     apikey:'sotyS0QXuNqzpG7j',
     senderid:'ADSRSS',
     msgType: 'text',
     number:req.body.phone,
     message: otp+'{#var#} is your OTP (One Time Password) to login to {#var#} -AdServs',
     duplicateCheck: 'true',
     format: 'json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
          
          var name = "user@" + Math.floor(1000 + Math.random() * 9000);
 
          var sql = "INSERT INTO `user_table`(`phone`,`fcm_id`,`otp`,`name`) VALUES('" + phone+ "','" + fcm_id + "','" + otp + "','" + name +"')";
          const query = conn.query(sql,(err, data) => {
          if(err) throw err;
          res.status(200).json({
              "result":"true",
              "message":"user signup secussfully",
               "data":[{
                id:data.insertId,
                phone,fcm_id,otp
               }]
         });
       });
     }
   })
  })
})
  }
 };




// create otp verify api
 const Verifyotp=(req,res)=>{
  const phone=req.body.phone;
  const otp=req.body.otp;
  if(otp & phone){   
  var sql="SELECT * FROM user_table WHERE phone='"+phone+"' AND otp='"+otp+"' ";
           let query = conn.query(sql,(err, data) => {
              if (err) throw err;
                if(data.length>0){
                res.status(200).json({
                  "result":"true",
                  "message":"user login secussfully",
                    data 
            }) 
              }else{
                return res.status(200).json({
                  "result":"false",
                  "message":"otp was worng",
                 
            });
       }          
 })
   }else{
    res.status(200).json({
        "result":"false",
        "message":"required parameters are phone and otp", 
      });
   }
};






// create user logout api
const Logout=(req,res)=>{
  const {id,fcm_id}=req.body;
  if(id){ 
      var sql="SELECT * FROM user_table WHERE id =?";
      let query = conn.query(sql,[id],(err, results) =>{
       if (err) throw err;
         
          var sql = "UPDATE user_table SET fcm_id='"+fcm_id+"' WHERE id="+req.body.id;
          let query = conn.query(sql, (err, results) => {
             if(err) throw err;
            return res.status(200).json({
             "result":"true",
             "message":"user Logout sucessfully"
             
         });
      });
    });
  }
 else{
      res.status(200).json({
      "result":"false",
      "message":"required parameters are id and send fcm_id null", 
    });   
  }
};




// create resend otp api 
const ResendOtp=async(req,res)=>{
  const{phone,fcm_id}=req.body;
   if(fcm_id & phone){ 
    res.status(200).json({
        "result":"false",
        "message":"required parameters are phone and fcm_id", 
      });
  }else{
  var sql="SELECT * FROM user_table WHERE phone =?";
      let query = conn.query(sql,[phone],(err,results ) => {
     if (err) throw err; 

  var otp = Math.floor(1000 + Math.random() * 9000);
  let sql = "UPDATE user_table SET otp='"+otp+"',fcm_id='"+fcm_id+"' WHERE phone="+req.body.phone;
  let query = conn.query(sql, (err, result) => {
         if(err) throw err;
  var sql="SELECT * FROM user_table WHERE phone =?";
  let query = conn.query(sql,[phone],(err, data) => {
        if (err) throw err;
         if(data.length>0){
          res.status(200).json({
          "result":"true",
          "message":"otp sent sucessfully",
          data
      });
       }
      })
    });
   })
 }    
};



// create user profile update api
const userProfile=async(req,res)=>{
  const{id}=req.body;
  const image=req.file.filename;
  var sql="SELECT * FROM user_table WHERE id =?";
  let query = conn.query(sql,[id],(err, results) => {
              if (err) throw err;
                        
    let sql = "UPDATE user_table SET image='"+req.file.filename+"' WHERE id="+req.body.id;
   let query = conn.query(sql, (err, results) =>{
      if(err) throw err;

  var sql="SELECT * FROM user_table WHERE id =?";
  let query = conn.query(sql,[id],(err, data) => {
              if (err) throw err;
              if(data.length>0){   
      return  res.status(200).json({
       "result":"true",
       "message":"image inserted sucessfully",
        "path": "https://mivizy.kuchvkharido.xyz/uploads/",
        data
         });
       }
     });
    })
  })
};






//create user detail update api
  const UserDetails = async (req, res) => {
  const { id, name, email, state, dob, phone } = req.body;
   try{

 var sql = "SELECT * FROM user_table ";
 var query = conn.query(sql,(err, data) => {
    if (err) throw err;
    var a=1;
    //start for loop
    for(let i=0;i<data.length;i++){
   if(data[i].name==name){
  a+=1;
  }

}//end for loop

if(a==1){
    
  var sql = "SELECT * FROM user_table WHERE id=?";
  var query = conn.query(sql,[id],(err, data) => {
    if (err) throw err;

    let sql = "UPDATE user_table SET name='" + name + "',email='" + email + "',state='" + state + "',dob='" + dob + "',phone='" + phone + "' WHERE id=" + req.body.id;
    let query = conn.query(sql, (err, data) => {
      if (err) throw err;

       var sql = "SELECT * FROM user_table WHERE id ="+id;
  let query = conn.query(sql,(err, data) => {
  if (err) throw err;
         return res.status(200).json({
            "result": "true",
            "message": "data inserted sucessfully",
             "path": "https://mivizy.kuchvkharido.xyz/uploads/",
           data
          });
      })
    }) 
  })

}//end if condiction here

else{
 
  var sql="SELECT * FROM user_table WHERE id='"+id+"' AND name='"+name+"' ";
  var query = conn.query(sql,(err, data) => {
    if (err) throw err;
    if(data.length>0){

    var sql = "UPDATE user_table SET name='" + name + "',email='" + email + "',state='" + state + "',dob='" + dob + "',phone='" + phone + "' WHERE id=" + req.body.id;
    var query = conn.query(sql, (err, data) => {
      if (err) throw err;

    }) // update end here

      var sql = "SELECT * FROM user_table WHERE id ="+id;
  var query = conn.query(sql,(err, data) => {
  if (err) throw err;
         return res.status(200).json({
            "result": "true",
            "message": "data inserted sucessfully",
             "path": "https://mivizy.kuchvkharido.xyz/uploads/",
           data
          });
      })

  }// second if end here
  else{
    res.status(200).json({result:"false",message:"user name allready exist"})
  }
  })
}//else end here

})
}catch(error){
  res.status(200).json({result:"false",message:error.message})
}
};









/*
//create user detail update api
  const UserDetails = async (req, res) => {
  const { id, name, email, state, dob, phone } = req.body;
   try{

  var sql = "SELECT * FROM user_table WHERE id=?";
  var query = conn.query(sql,[id],(err, data) => {
    if (err) throw err;

    let sql = "UPDATE user_table SET name='"+name+"', state='" + state + "',dob='" + dob + "',phone='" + phone + "' WHERE id=" + req.body.id;
    let query = conn.query(sql, (err, data) => {
      if (err) throw err;

       var sql = "SELECT * FROM user_table WHERE id ="+id;
  let query = conn.query(sql,(err, data) => {
  if (err) throw err;
         return res.status(200).json({
            "result": "true",
            "message": "data inserted sucessfully",
             "path": "https://mivizy.kuchvkharido.xyz/uploads/",
           data
          });
      })
    }) 
  })


}catch(error){
  res.status(200).json({result:"false",message:error.message})
}
};

*/












//create email otp generate api
const EmailSendOtp= async(req, res)=>{
    // define veriables
    var email = req.body.email;
    var id= req.body.id;
    // required parameters
       if(!email || !id){
         res.status(400).json({
        "result":"false",
        "message":"required parameters are id and email", 
    });

   }else{  
    var otps = Math.floor(1000 + Math.random() * 9000);
    let sql = "UPDATE user_table SET otps='"+otps+"' WHERE id="+req.body.id;
    const query = conn.query(sql,(err, results) =>{
          if(err) throw err;
      
      
      
      
   // send otps on email
   var email;
var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
    user: 'dinuthecoder@gmail.com',
    pass: 'eqisxmvaunwenvml'
  }
});     
             
    // send mail with defined transport object
        var mailOptions = {
         from: 'dinuthecoder@gmail.com',
         to:req.body.email,
         subject: 'Send otp for email verification',
         html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otps +"</h1>" // html body

     };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
          return res.status(200).json({
                 "result":"true",
                 "message":"otp generate sucessfully",
                 "data":[{
                  id,email,otps
                 }
              ]
          });
       })
        
  }
};
 






//  create verify email api using nodejs and mysql database
const VerifyEmail = async (req, res) => {
  // define variables
  var id = req.body.id;
  const email = req.body.email;
  const otps = req.body.otps;
  //required parameters
  if (!email || !id)
    return res.status(200).json({
      "result": "false",
      "message": "required parameters are id ,email and otps",
    });

 var sql = "SELECT * FROM user_table WHERE id='" + id + "' AND otps='" + otps + "' ";
    let query = conn.query(sql, (err, data) => {
       if (err) throw err;
      if (data.length > 0) {


  let sql = "UPDATE user_table SET email='" + email + "' WHERE id=" + id ;
  const query = conn.query(sql, (err, data) => {
    if (err) throw err;
    res.status(200).json({
          "result": "true",
          "message": "email verify secussfully",
        })
   }) 
}else{
    // verify email with otp
    var sql = "SELECT * FROM user_table WHERE id='" + id + "' AND otps='" + otps + "' ";
    let query = conn.query(sql, (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        

      } else {
        return res.status(200).json({
          "result": "false",
          "message": "please check your email and otp",
        });
      }
    })
  }
  })
};






// create get user_Profile api
const GetUserProfile=async(req,res)=>{
  const id=req.body.id;
  if(!id){
    return res.status(200).json({"result":"false","message":"id required"})

  }
  let sql = "SELECT * FROM user_table WHERE id="+req.body.id;
  let query = conn.query(sql, (err, data) => {
    if(err) throw err;
     if(data.length>0){
      res.status(200).json({
          "result":"true",
          "message":"all data",
           "path": "https://mivizy.kuchvkharido.xyz/uploads/",
          data
        })
      }else{
            res.status(200).json({
            "result":"false",
            "message":"result does not found"
               });
           }
      })
};




// create contest list  api
const ContestList=async(req,res)=>{
  let sql = "SELECT * FROM contest_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
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




// create leader board list on today basis
const Leader_boardToday=async(req,res)=>{
   let sql = "SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id =u.id WHERE DATE(l.modified_date) = SUBDATE(CURDATE(),0) ORDER BY position";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).json({
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



// create leader board list on Yestersday basis
const Leader_boardYestersday=async(req,res)=>{
  /*const created_date=req.body.created_date;
  if(!created_date)
return res.status(400).json({
  "result":"false",
  "message":"created_date is required,only current date send in this format 2023-01-22"})
  let sql = "SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id =u.id WHERE  l.created_date= DATE_SUB('"+req.body.created_date+"', INTERVAL 1 DAY) ORDER BY position"; 
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;*/
           
           
           
           
         let sql = "SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id =u.id WHERE  DATE(l.modified_date) = SUBDATE(CURDATE(),1) ORDER BY position"; 
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
             
           
           
           
           
           if(results.length>0){
               res.status(200).json({
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





// create categoy list
const CategoryList=async(req,res)=>{
  let sql = "SELECT * FROM category_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).json({
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


// create contact list api
const ContactList=async(req,res)=>{
  let sql = "SELECT * FROM contact_us_table";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
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




// create get category _list api
const Category_question_list=async(req,res)=>{
  const category_id=req.body.category_id;
  const user_id=req.body.user_id;
  if(!category_id & user_id){
    return res.status(200).json({"result":"false","message":"category_id and user_id required"})

  }
  //let sql = "SELECT q.* FROM question_table q LEFT JOIN attempt_question_table a ON q.question_id =a.question_id AND a.user_id="+user_id+" WHERE q.category_id="+category_id+" AND a.user_id IS NULL OR a.user_id !="+req.body.user_id;  
  let sql = "SELECT q.*,a.user_id FROM question_table q LEFT JOIN attempt_question_table a ON q.question_id =a.question_id AND a.user_id="+req.body.user_id+" WHERE q.status="+ 0 +" AND q.category_id="+category_id+" ORDER BY q.question_id DESC";   
  let query = conn.query(sql, (err, data) => {
    if(err) throw err;
     if(data.length>0){
      res.status(200).json({
          "result":"true",
          "path": "https://mivizy.kuchvkharido.xyz/uploads/",
          "message":"all data",
          data
        })
      }else{
            res.status(200).json({
            "result":"false",
            "message":"result does not found"
               });
           }
      })
};





/*// create attempt questions api
const AttemptQuestions=async(req,res)=>{
  const coins=req.body.coins;
  const data={user_id,question_id,contest_id,your_answer,status,created_date}=req.body;
   if(!user_id || !question_id & !contest_id || !your_answer){
    return res.status(400).json({
              "result":"false",
              "message":"required parameters are user_id,contest_id,question_id,status",
            });
 }

 var a=0;
 var b=1;
 if(user_id){
  var close=b;
  console.log(close)
 }else{
var open=a;
console.log(open)
 };

var sql = "INSERT INTO `attempt_question_table`(`user_id`,`question_id`,`contest_id`,`your_answer`,`status`,`created_date`,`coins`) VALUES('" + user_id + "','" + question_id + "','"+contest_id+"','"+your_answer+"','"+close+"','"+created_date+"','"+coins+"')";
    var query = conn.query(sql,data,function(err, results) {
        if(err) throw err;
        res.status(200).json({
              "result":"true",
              "message":"add secussfully",
              "data":{
                id:results.insertId,user_id,question_id,your_answer,status,coins
              }
     });
    });




var sql = "SELECT * FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id  WHERE q.question_id ="+question_id;
var query = conn.query(sql, (err, data) => {
   if(err) throw err;
   

   var option_attempt_a=0;
   var option_attempt_b=0;
   var option_attempt_c=0;
   var option_attempt_d=0;

   // for loop start
   for(let i=0;i<data.length;i++){
    if(data[i].your_answer=="a"){
      option_attempt_a+=1;
    }

    // start second loop
    else if
      (data[i].your_answer=="b"){
        option_attempt_b+=1;
    }
    // start third loop
    else if
    (data[i].your_answer=="c"){
      option_attempt_c+=1;
    }
// end loop
    else if
      (data[i].your_answer=="d"){
       option_attempt_d+=1;
      }
      
  };
   

 var no_of_participants=0;
  var coin=0;
// for loop start
   for(let i=0;i<data.length;i++){
    if(data[i]=="req.body.user_id"){
      coin+=1;
    }else{
      no_of_participants+=1;
    }
  }
  
  
  
 var total_coins=0;
  var ram=0;
// for loop start
   for(let i=0;i<data.length;i++){
    if(data[i]=="req.body.user_id"){
      ram+=1;
    }else{
      total_coins+=10;
    }
  }
  
  

  var question_id=req.body.question_id;
let sql = "UPDATE question_table q SET option_attempt_a='"+option_attempt_a+"',option_attempt_b='"+option_attempt_b+"',option_attempt_c='"+option_attempt_c+"',option_attempt_d='"+option_attempt_d+"',total_coins='"+total_coins+"',no_of_participants='"+no_of_participants+"' WHERE q.question_id="+question_id;
  let query = conn.query(sql, (err,data) => {
    if(err) throw err;

 })
  })
 
};*/








// create attempt questions api
const AttemptQuestions = async (req, res) => {
  const coins = req.body.coins;
  const data = { user_id, question_id, contest_id, your_answer, status,created_date } = req.body;
  if (!user_id || !question_id & !contest_id || !your_answer) {
    return res.status(400).json({
      "result": "false",
      "message": "required parameters are user_id,contest_id,question_id,status",
    });
  }

  var a = 0;
  var b = 1;
  if (user_id) {
    var close = b;
    console.log(close)
  } else {
    var open = a;
    console.log(open)
  };


// find userid in leader board table
var sql = "SELECT * FROM leader_board_table WHERE user_id=? AND contest_id=? ";
  var query = conn.query(sql,[user_id,contest_id], (err, data) => {
    if (err) throw err;
    if(data.length>0){}
else{
//insert data in leaderbord table
 var sql = "INSERT INTO `leader_board_table`(`user_id`,`contest_id`,`created_date`) VALUES('" + user_id + "','" + contest_id + "','"+created_date+"')";
  var query = conn.query(sql, data, function (err, results) {
    if (err) throw err;

})
    
  }
})//end leader board table here



  var sql = "INSERT INTO `attempt_question_table`(`user_id`,`question_id`,`contest_id`,`your_answer`,`status`,`coins`,`created_date`) VALUES('" + user_id + "','" + question_id + "','" + contest_id + "','" + your_answer + "','" + close + "','" + coins + "','"+created_date+"')";
  var query = conn.query(sql, data, function (err, results) {
    if (err) throw err;
    res.status(200).json({
      "result": "true",
      "message": "add secussfully",
      "data": {
        id: results.insertId, user_id, question_id, your_answer, status, coins
      }
    });
  });

  var sql = "SELECT * FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id  WHERE q.question_id =" + question_id;
  var query = conn.query(sql, (err, data) => {
    if (err) throw err;


    var option_attempt_a = 0;
    var option_attempt_b = 0;
    var option_attempt_c = 0;
    var option_attempt_d = 0;

    // for loop start
    for (let i = 0; i < data.length; i++) {
      if (data[i].your_answer == "a") {
        option_attempt_a += 1;
      }

      // start second loop
      else if
        (data[i].your_answer == "b") {
        option_attempt_b += 1;
      }
      // start third loop
      else if
        (data[i].your_answer == "c") {
        option_attempt_c += 1;
      }
      // end loop
      else if
        (data[i].your_answer == "d") {
        option_attempt_d += 1;
      }

    };


    var no_of_participants = 0;
    var coin = 0;
    // for loop start
    for (let i = 0; i < data.length; i++) {
      if (data[i] == "user_id") {
        coin += 1;
      } else {
        no_of_participants += 1;
      }
    }
   // console.log(no_of_participants)
   const dr=no_of_participants;

    var total_coins = no_of_participants *= 10;
    //console.log(total_coins)

    var question_id = req.body.question_id;
    let sql = "UPDATE question_table q SET option_attempt_a='" + option_attempt_a + "',option_attempt_b='" + option_attempt_b + "',option_attempt_c='" + option_attempt_c + "',option_attempt_d='" + option_attempt_d + "',total_coins='" + total_coins + "',no_of_participants='" + dr + "' WHERE q.question_id=" + question_id;
    let query = conn.query(sql, (err, data) => {
      if (err) throw err;

    })
  })

};















// create  your openions api
const YourOpenions=async(req,res)=>{
  const user_id=req.body.user_id;
  if(!user_id){
    return res.status(200).json({"result":"false","message":"user_id required"})

  }
  //let sql = "SELECT * FROM attempt_question_table a INNER JOIN question_table //q ON a.question_id = q.question_id WHERE a.user_id="+req.body.user_id;
  
  
  let sql = "SELECT * FROM attempt_question_table a INNER JOIN question_table q ON a.question_id = q.question_id INNER JOIN contest_table c ON a.contest_id = c.contest_id WHERE a.user_id =" + req.body.user_id;
  
  
  
  
  
  let query = conn.query(sql, (err, data) => {
    if(err) throw err;
     if(data.length>0){
      res.status(200).json({
          "result":"true",
          "message":"all data",
          "path": "https://mivizy.kuchvkharido.xyz/uploads/",
          data
        })
      }else{
            res.status(200).json({
            "result":"false",
            "message":"result does not found"
               });
           }
      })
};




// create question details api
const QuestionDetails =async(req,res)=>{
  const question_id=req.body.question_id;
  if(!question_id){
    return res.status(200).json({"result":"false","message":"question_id required"})

  }
let sql = "SELECT * FROM question_table WHERE question_id ="+req.body.question_id;  
let query = conn.query(sql, (err, data) => {
    if(err) throw err;
     if(data.length>0){
      res.status(200).json({
          "result":"true",
          "message":"all data",
          "path": "https://mivizy.kuchvkharido.xyz/uploads/",
          data
        })
      }else{
            res.status(200).json({
            "result":"false",
            "message":"result does not found"
               });
           }
      })
};










// create  question list api
const Open_question_list=async(req,res)=>{
  const user_id=req.body.user_id;
  if(!user_id){
    return res.status(200).json({"result":"false","message":"user_id required"})

  }
  
//let sql = "SELECT q.* FROM question_table q LEFT JOIN attempt_question_table a ON q.question_id =a.question_id AND a.user_id="+req.body.user_id+" WHERE a.user_id IS NULL OR a.user_id !="+req.body.user_id;
let sql = "SELECT q.*,a.user_id FROM question_table q LEFT JOIN attempt_question_table a ON q.question_id =a.question_id AND a.user_id="+req.body.user_id+" WHERE q.status="+0+" ORDER BY q.question_id DESC";   
let query = conn.query(sql, (err, data) => {
    if(err) throw err;
     if(data.length>0){
      res.status(200).json({
          "result":"true",
          "message":"all data",
          "path": "https://mivizy.kuchvkharido.xyz/uploads/",
          data
        })
      }else{
            res.status(200).json({
            "result":"false",
            "message":"result does not found"
               });
           }
      })
};





//create faqllist list api
const Faq_Lists=async(req,res)=>{
let sql = "SELECT * FROM faq_table";
         let query =await conn.query(sql, (err, data) =>{
           if(err) throw err;
               res.status(200).json({
                 "result":true,
                   "message":"all data",
                      "data":data
                    });
           })

};





// state list api
const State = async (req, res) => {
  var state = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chattisgarh",
    "Goa", "Gujrat", "Haryana", "Himachal Pradesh", "Karnataka", "kerala", "Madhya Pradesh",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Panjab", "Rajsthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
  res.status(200).json({
    "result": "true",
    "message": "all state list are",
    state
  })
};


    






// create request amount  api
const Request_amount = async (req, res) => {
  const data = { user_id, amount,status,created_date } = req.body;
  if (!user_id & !amount) {
    return res.status(200).json({
      "result": "false",
      "message": "required parameters are user_id,amount",
    });
  }

//appliy validation api
  var sql="SELECT * FROM voucher_table WHERE user_id="+user_id;
  var query=conn.query(sql,(err,data)=>{
    if(err)throw err;

     if(data.length==0){
     var sql = "INSERT INTO `voucher_table`(`user_id`,`amount`,`status`) VALUES('"+user_id+"','"+amount+"','"+0+"')";
  var query = conn.query(sql,(err, results) => {
    if (err) throw err;
    res.status(200).json({
      "result": "true",
      "message": "add secussfully",
      "data": {
        id: results.insertId, user_id, amount
       }
     });
   });

  }else{
var approve=0;
var approved=0;
for(let i=0;i<data.length;i++){
  if(data[i].status==0){
    approve+=1;
  }

}
if(approve==0){
  var sql = "INSERT INTO `voucher_table`(`user_id`,`amount`,`status`) VALUES('"+user_id+"','"+amount+"','"+0+"')";
   var query = conn.query(sql,(err, results) => {
     if (err) throw err;
     res.status(200).json({
       "result": "true",
       "message": "add secussfully",
       "data": {
         id: results.insertId, user_id, amount
        }
      });
   });

   }

 else{

res.status(200).json({result:"false",message:"previous requested amount has not been approved yet"});

   }
}
  })
 
};





// create leader board today user rank  list on today basis
const Leader_boardtoday_user_ranks=async(req,res)=>{
const user_id=req.body.user_id;
  if(! user_id)
  return res.status(200).json({
  "result":"false",
  "message":" user_id is required"})

   let sql = "SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id =u.id WHERE l.user_id="+user_id+" AND DATE(l.modified_date) = SUBDATE(CURDATE(),0) ORDER BY position";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).json({
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





// create leader board  yestersday user rank list on Yestersday basis
const Leader_boardYestersday_user_rank=async(req,res)=>{
  /*const created_date=req.body.created_date;
   const user_id=req.body.user_id;
  if(!created_date & ! user_id)
return res.status(200).json({
  "result":"false",
  "message":"created_date and user_id are required,only current date require send in this format 2023-01-22"})
  let sql = "SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id =u.id WHERE l.user_id="+user_id+" AND l.created_date= DATE_SUB('"+req.body.created_date+"', INTERVAL 1 DAY)"; 
  */
  
  
  
  
  
  
 
   const user_id=req.body.user_id;
  if(!user_id)
return res.status(200).json({
  "result":"false",
  "message":" user_id  required "})
  let sql = "SELECT * FROM leader_board_table l INNER JOIN user_table u ON l.user_id =u.id WHERE l.user_id="+user_id+" AND  DATE(l.modified_date) = SUBDATE(CURDATE(),1) ORDER BY position";
  
  
  
  
  
  
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
           if(results.length>0){
               res.status(200).json({
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






/*
// create  correct answer calculation api 
const Correct_answer_user_list = async (req, res) => {
  const contest_id = req.body.contest_id;
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


let sql = "SELECT a.* FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer  WHERE a.contest_id="+contest_id+" GROUP by a.user_id";
let query = conn.query(sql, (err, data) => {
if (err) throw err;

// start tird loop
 for (let i = 0; i < data.length; i++) {
  const contestID = data[i].contest_id;
 const co=data[i].coins;
              
   if(contestID){
      var sql = "INSERT INTO `leader_board_table`(`user_id`,`contest_id`,`coin`,`created_date`) VALUES('" + data[i].user_id + "','"+data[i].contest_id+"','"+co+"','"+data[i].created_date+"')";
      var query = conn.query(sql,data,function(err, results) {
      if(err) throw err;
    })
   } // if end
 }// end third loop
 
  // calculate user rank

  var sql = "SELECT user_id,coin,RANK()OVER(ORDER BY coin DESC)AS RANK FROM leader_board_table WHERE contest_id="+contest_id;
  var query = conn.query(sql, (err, data) => {
    if (err) throw err;

       // start fourth loop
    for (let i = 0; i < data.length; i++) {
     const user_ID = data[i].user_id;
     const p=data[i].RANK;
     //console.log(p);
     //console.log(user_ID);
     if(user_ID){
     let sql = "Update leader_board_table  Set position = "+data[i].RANK+" WHERE user_id="+user_ID;
     let query = conn.query(sql, (err, data) => {
        if (err) throw err;
                 })
             }
          }     // end fourth loop
      })// end user rank


      res.status(200).json({
     "result": "true",
     "message": "all data",
      data
     })
    })
  })
    })//
 };
*/





// create  correct answer calculation api 
const Correct_answer_user_list = async (req, res) => {
  const contest_id = req.body.contest_id;
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
  var sql = "SELECT * FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer WHERE a.contest_id="+contest_id+" GROUP by q.question_id";
   conn.query(sql, (err, data) => {
      res.status(200).json({
     "result": "true",
     "message": "all data",
      data
     })
    })
   })
  })
    
 };

// end
 //create user rank api
const usersRank=(req,res)=>{
  const contest_id = req.body.contest_id;
var sql = "SELECT a.* FROM attempt_question_table a INNER JOIN question_table q ON a.question_id=q.question_id AND a.your_answer =q.correct_answer  WHERE a.contest_id="+contest_id+" GROUP by a.user_id";
var query = conn.query(sql, (err, data) => {
if (err) throw err;

// start tird loop
 for (let i = 0; i < data.length; i++) {
  const contestID = data[i].contest_id;
 const co=data[i].coins;
              
   if(contestID){
      var sql = "INSERT INTO `leader_board_table`(`user_id`,`contest_id`,`coin`,`created_date`) VALUES('" + data[i].user_id + "','"+data[i].contest_id+"','"+co+"','"+data[i].created_date+"')";
      var query = conn.query(sql,data,function(err, results) {
      if(err) throw err;
    })
   } // if end
 }// end third loop
 
  // calculate user rank

  var sql = "SELECT user_id,coin,RANK()OVER(ORDER BY coin DESC)AS RANK FROM leader_board_table WHERE contest_id="+contest_id;
  var query = conn.query(sql, (err, data) => {
    if (err) throw err;

       // start fourth loop
    for (let i = 0; i < data.length; i++) {
     const user_ID = data[i].user_id;
     const p=data[i].RANK;
     //console.log(p);
     //console.log(user_ID);
     if(user_ID){
     var sql = "Update leader_board_table  Set position = "+data[i].RANK+" WHERE user_id="+user_ID;
    var query = conn.query(sql, (err, data) => {
        if (err) throw err;
                 })
             }
          }     // end fourth loop

    res.status(200).json({
     "result": "true",
     "message": "all data",
      data
      })// end user rank
})
});
};










//create today earn coins api
const Today_earn_coin =async(req,res)=>{
  const user_id=req.body.user_id;
  if(!user_id){
    return res.status(200).json({"result":"false","message":"user_id required"})

  }
  let sql = "SELECT * FROM leader_board_table WHERE created_date=CURDATE() AND user_id="+user_id;  
  let query = conn.query(sql, (err, data) => {
    if(err) throw err;
    if(data.length>0){
      res.status(200).json({
        "result":"true",
        "message":"all data",
        data
      })
    }else{
      res.status(200).json({
        "result":"false",
        "message":"result does not found"
      });
    }
  })
};



//create Yestersday earn coins api
const Yestersday_earn_coin =async(req,res)=>{
  const user_id=req.body.user_id;
   const created_date=req.body.created_date;
  if(!user_id){
    return res.status(200).json({"result":"false","message":"user_id  required"})

  }
  let sql = "SELECT * FROM leader_board_table WHERE user_id ="+user_id+" AND created_date = DATE_SUB('"+req.body.created_date+"', INTERVAL 1 DAY) ";  
  let query = conn.query(sql, (err, data) => {
    if(err) throw err;
    if(data.length>0){
      res.status(200).json({
        "result":"true",
        "message":"all data",
        data
      })
    }else{
      res.status(200).json({
        "result":"false",
        "message":"result does not found"
      });
    }
  })
};



//create monthly earn coins api
const Monthly_earn_coin =async(req,res)=>{
  const user_id=req.body.user_id;
  if(!user_id){
    return res.status(200).json({"result":"false","message":"user_id  are required"})

  }
   let sql = "SELECT * FROM leader_board_table WHERE user_id="+user_id+" AND created_date BETWEEN CURDATE()-INTERVAL 30 DAY AND CURDATE()";  
  let query = conn.query(sql, (err, data) => {
    if(err) throw err;
    if(data.length>0){
      res.status(200).json({
        "result":"true",
        "message":"all data",
        data
      })
    }else{
      res.status(200).json({
        "result":"false",
        "message":"result does not found"
      });
    }
  })
};





// create text amount api 
const  Text_amount=async (req,res)=>{
 const data = {text}=req.body;
   if(!text)
    return res.status(400).json({
      result:false,
      message:"required parameters text"
    });
       
         const sql = "INSERT INTO amount_table SET ?";
         const query = conn.query(sql, data,(err, results) => {
          if(err) throw err;
            res.status(200).json({
               "result":"true",
              "message":"add secussfully", 
                "data": {
                   id:results.insertId,
                          text
                        }
                    });
                 });
};


// text amount list
const Text_amount_List=async(req,res)=>{
let sql = "SELECT * FROM amount_table ";
         let query =await conn.query(sql, (err, results) =>{
           if(err) throw err;
               res.status(200).json({
                 "result":"true",
                   "message":"all data",
                      "data": results
                    });
           })

};









module.exports={
 AllQuestion,
 BannerList,
 Trade,
 PrivacyList,
 TermList,
 UserSignup,
 Verifyotp,
 Logout,
 ResendOtp,
 userProfile,
 UserDetails,
 EmailSendOtp,
 VerifyEmail,
 GetUserProfile,
 ContestList,
 Leader_boardToday,
 Leader_boardYestersday,
 CategoryList,
 ContactList,
 Category_question_list,
 AttemptQuestions,
YourOpenions,
QuestionDetails,
Open_question_list,
Faq_Lists,
State,
Request_amount,
Leader_boardtoday_user_ranks,
Leader_boardYestersday_user_rank,
Correct_answer_user_list,
Today_earn_coin,
 Yestersday_earn_coin,
 Monthly_earn_coin,
Text_amount,
 Text_amount_List,
 usersRank


 
};