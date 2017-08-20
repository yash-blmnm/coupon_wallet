package com.example.priya.myapplication;

import org.json.JSONArray;
import org.json.JSONObject;

import android.app.Activity;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import java.util.*;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.Arrays;
import java.util.StringTokenizer;
import java.text.BreakIterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by priya on 19/08/17.
 */

public class SMSRead extends AppCompatActivity {

    public void getCouponList(){
        String url = "http://49ee638a.ngrok.io/get_coupons?user_id=1";
        RequestQueue queue = Volley.newRequestQueue(this);

        // prepare the Request
        JsonObjectRequest getRequest = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>()
                {
                    @Override
                    public void onResponse(JSONObject response) {
                        // display response
                        Log.d("Response", response.toString());
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Error.Response", error.toString());
                    }
                }
        );

        // add it to the RequestQueue
        queue.add(getRequest);
    }

    public void sendToNode(final String couponCode, final String validityCode) {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://49ee638a.ngrok.io/users/";

        StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>()
                {
                    @Override
                    public void onResponse(String response) {
                        // response
                        Log.d("Response", response);
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // error
                        Log.d("Error.Response", error.toString());
                    }
                }
        ) {
//            @Override
//            protected Map<String, String> getParams()
//            {
//                Map<String, String>  params = new HashMap<String, String>();
//                params.put("couponCode", couponCode);
//                params.put("validityCode", validityCode);
//
//                return params;
//            }
            
        };
        queue.add(postRequest);
    }

    public String[] extractCouponCodeAndValidity(String smsBody){
        String couponCode = "";
        String str="";
        String validity="";
        StringTokenizer st;
        Pattern pattern = Pattern.compile("[0-9A-Z]*");
        Pattern validityPattern = Pattern.compile("([0-9]+)(st|nd|rd|th) (January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)");
        Matcher matcher;
        String word = "";
        String[] words, result;
        words = new String[20];
        boolean couponFlag, validityFlag;
        result = new String[2];
        couponFlag = false;
        validityFlag = false;

        BreakIterator iterator = BreakIterator.getSentenceInstance(Locale.US);
        iterator.setText(smsBody);
        int start = iterator.first();
        for (int end = iterator.next();
             end != BreakIterator.DONE;
             start = end, end = iterator.next()) {
            if(!couponFlag){
                couponFlag=false;}
            if(!validityFlag){
                validityFlag=false;}

             str = smsBody.substring(start,end);

            if(str.toLowerCase().contains("code")){
                words =  str.split(" ");
                for(String s: words){
                    matcher = pattern.matcher(s);
                    //System.out.println("word: "+ s + "\t matches : " + matcher.matches());
                    if(matcher.matches()){
                        couponFlag=true;
                        couponCode = s;
                        break;
                    }
                }
            }

            if(str.toLowerCase().contains("valid") || str.toLowerCase().contains("avail") || str.toLowerCase().contains("till") ){
                    matcher = validityPattern.matcher(str);
                    //System.out.println("word: "+ s + "\t matches : " + matcher.matches());
                    if(matcher.find()){
                        validityFlag=true;
                        validity = matcher.group(0);
                        break;
                    }
            }

            if(couponFlag && validityFlag){
                break;
            }
        }

        result[0]= couponCode;
        result[1] = validity;
        return result;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            TextView view = new TextView(this);
            Uri uriSMSURI = Uri.parse("content://sms/inbox");
            Cursor cur = getContentResolver().query(uriSMSURI, null, null, null, null);
            String sms = "";
            String sender = "";
            String body = "";
            String result[] = new String[2];

            //getCouponList();

            while (cur.moveToNext()) {
                sender = cur.getString(2);
                body = cur.getString(12);
                String validity = "";
                String couponCode = "";


                if(sender.toLowerCase().contains("ola") || sender.toLowerCase().contains("lifstl")) {
                    if(body.toLowerCase().contains("offer")) {

                        // Track the retrieved SMS here
                        sms += "Address :" + sender + " Body: " +  body + "\n";

                        // extract the coupon code

                        result = extractCouponCodeAndValidity(body);
                        System.out.println("Address :" + sender +" Body: " + body + "\n\t Coupon code: " + result[0] + "\n\t Validity Code: " + result[1]);

                        sendToNode(result[0], result[1]);
                    }
                }
            }
        view.setText(sms);
        setContentView(view);
    }
}
