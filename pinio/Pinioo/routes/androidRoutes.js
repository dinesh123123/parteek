// import module here
const express =require("express");
const router=express();
const multer=require("multer");


// import android controllers file
const androidControllers =require("../controllers/androidControllers");



// create file storage
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },

});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    }

   },
   limits:{

    filesize:10000000000 //1000000 bytes=1MB
   }
});



//
router.get("/get",(req,res)=>{
    res.send("hii dinesh")
});




// setup android controllers url file
 router.get('/questions_list',androidControllers.AllQuestion);  
 router.get('/tradeList',androidControllers.Trade); 
 router.get('/privacyList',androidControllers.PrivacyList); 
 router.get('/termList',androidControllers.TermList); 
 router.get('/bannerList',androidControllers.BannerList);
 router.post('/signup',androidControllers.UserSignup); 
 router.post('/verifyotp',androidControllers.Verifyotp);
 router.post('/logout',androidControllers.Logout);
 router.post('/resendotp',androidControllers.ResendOtp);
 router.post('/update_profile',upload.single('image'),androidControllers.userProfile);
 router.post('/update_user_details',androidControllers.UserDetails);
 router.post('/send_otp_through_email',androidControllers.EmailSendOtp);
 router.post('/emailverify',androidControllers.VerifyEmail);
 router.post('/get_user_profile',androidControllers.GetUserProfile);
 router.get('/contest_list',androidControllers.ContestList);
 router.get('/leader_board_today_list',androidControllers.Leader_boardToday);
 router.post('/leader_board_yestersday_list',androidControllers.Leader_boardYestersday);
 router.get('/category_list',androidControllers.CategoryList);
 router.get('/contact_list',androidControllers.ContactList);
 router.post('/category_question_list',androidControllers.Category_question_list);
 router.post('/attempt_question',androidControllers.AttemptQuestions);
 router.post('/get_your_opinions',androidControllers.YourOpenions);
 router.post('/question_details',androidControllers.QuestionDetails);
 router.post('/question_Lists',androidControllers.Open_question_list);
 router.get("/faq_lists",androidControllers.Faq_Lists);
 router.get('/state_list',androidControllers.State);
 router.post('/amount_request',androidControllers.Request_amount);
 router.post('/user_today_rank',androidControllers.Leader_boardtoday_user_ranks);
 router.post('/user_yestersday_rank',androidControllers.Leader_boardYestersday_user_rank);
 router.get('/correct_answer',androidControllers.Correct_answer_user_list);
  router.post('/today_earn',androidControllers.Today_earn_coin);
 router.post('/yestersday_earn',androidControllers.Yestersday_earn_coin);
  router.post('/monthly_earn',androidControllers.Monthly_earn_coin);
  router.post('/text_amount',androidControllers.Text_amount);
  router.get('/text_amount_list',androidControllers. Text_amount_List);
 router.get('/rank',androidControllers.usersRank);
 
 

 module.exports=router;

