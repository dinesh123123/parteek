// import module here
const express =require("express");
const router=express();
const multer=require("multer");

// import admin controllers file
const adminControllers =require("../controllers/admin_controllers");
//const auth=require("../middlewere/admin_auth");


// file storage
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

router.get("/dinu",(req,res)=>{
    res.send("fall")
    
});

// setup admin controllers url file
 router.post('/admin_login',adminControllers.AddminLogin);  
 router.post('/create_question',upload.single('image'),adminControllers.Question);  
 router.get('/question_list',adminControllers.AllQuestion); 
 router.post('/update_question/:question_id',upload.single('image'),adminControllers.QuestionUpdate);   
 router.get('/delete_question/:question_id',adminControllers. QuestionDelete);
 router.post('/create_banner',upload.single('image'),adminControllers.Banner);  
 router.get('/banner_list',adminControllers.BannerList);
 router.post('/banner_update/:id',upload.single('image'),adminControllers.BannerUpdate);
 router.get('/banner_delete/:id',adminControllers.BannerDelete);   
 router.post('/create_trade',adminControllers.HowToTrade);  
 router.get('/tradeList',adminControllers.HowToTradeList);
 router.post('/trade_update/:id',adminControllers.HowToTradeUpdate);
 router.get('/trade_delete/:id',adminControllers.HowToTradeDelete);
 router.post('/create_privacy',adminControllers.Privacy);  
router.get('/privacyList',adminControllers.PrivacyList);
 router.post('/update_privacy/:id',adminControllers.PrivacyUpdate);
 router.get('/delete_privacy/:id',adminControllers.PrivacyDelete);   
 router.post('/create_term',adminControllers.TermsAndCondition);  
 router.get('/termList',adminControllers.TermsAndConditionList);
 router.post('/term_update/:term_id',adminControllers.TermsAndConditionUpdate);
 router.get('/delete_term/:term_id',adminControllers.TermsAndConditionDelete);   
  router.post('/create_leaderboard',adminControllers.LeaderBoard); 
  router.post('/create_contest',adminControllers.CreateContest);
  router.get('/contest_list',adminControllers.contestLlist); 
  router.get('/contest_delete/:contest_id',adminControllers.ContestDelete);  
  router.post('/contact_us',adminControllers.ContactUs);
  router.get('/contactList',adminControllers.ContactList);
  router.post('/contact_update/:id',adminControllers.ContactUpdate);
 //router.post('/csvfile_upload',upload.single('image'),adminControllers.csvfilePages);
 router.post('/category_update/:category_id',upload.single('image'),adminControllers.CategoryUpdate);
router.post('/create_category',upload.single('image'),adminControllers.Category);
 router.get('/category',adminControllers.Categorylist);
 router.get('/category_delete/:category_id',adminControllers.CategoryDelete);
 router.get('/user_list',adminControllers.Userlist);
 router.get('/user/:id',adminControllers.UserDetail);
 router.post('/contest_update/:contest_id',adminControllers.contest_Update);
 

// SET URL FOR ADDMIN PANNEL
 router.get('/index',adminControllers.IndexPage);
 router.get('/create_question',adminControllers.CreateQuestionPage);
 router.get('/admin_login',adminControllers.AdminLoginPage);
 router.get('/csvfile_upload',adminControllers.csvfilePage);
 router.get('/banner_update/:id',adminControllers.Updatebanner);
 router.get('/category_update/:category_id',adminControllers.Updatecategory);
 router.get('/update_question/:question_id',adminControllers.Updatequestion);
 router.get('/contact_update/:id',adminControllers.Contactupdate);
 router.get('/term_update/:term_id',adminControllers.Updateterm);
 router.get("/admin_logout",adminControllers.AdminLogout);
 router.get("/trade_update/:id",adminControllers.UpdateHowToTrade);
 router.get("/create_category",adminControllers.categoryPage);
 router.get("/create_banner",adminControllers.BannerPage);
 router.get("/create_contest",adminControllers.ContestPage);
 router.get("/contest_update/:contest_id",adminControllers.Update_contest);
 router.get('/update_privacy/:id',adminControllers.Updatepollicy);
 router.get("/create_privacy",adminControllers.PrivacyPage);
 router.get("/create_trade",adminControllers.TradePage);
 router.get("/create_term",adminControllers.TermPage);
 router.get("/faq_list",adminControllers.Faq_List);
 router.get("/create_faq",adminControllers.FaqPage);
 router.post('/create_faq',adminControllers.Faq);
 router.get('/delete_faq/:id',adminControllers.FaqDelete);  
  router.post('/faq_update/:id',adminControllers.FaqUpdate);  
  router.get('/faq_update/:id',adminControllers.UpdateFaq); 
  router.get('/status_update/:contest_id',adminControllers.contest_Updatestatus);
  router.get('/leader_board',adminControllers.leaderboardlist);
router.get('/prize_distribuction/:user_id',adminControllers.PrizeDistribuction);
router.post('/prize_distribuction/:user_id',adminControllers.Wonvoucher);
router.get('/amount_request',adminControllers.amount_requestlist);
router.get('/amount_request_delete/:request_id',adminControllers.amountRequestDelete);
router.get('/rank_calculation/:question_id',adminControllers.Calculation);
router.get('/payment_approve/:user_id',adminControllers.paymentManagement);
router.post('/filter_winners',adminControllers.leaderboardlists);
router.post('/update_ans/:question_id',adminControllers.UpdateQuestions);
router.get('/update_ans/:question_id',adminControllers.updateCorrect_answerPage);
  
  
  
  

module.exports=router;

