package com.example.priya.myapplication;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.*;
import java.text.*;

import static java.util.regex.Matcher.quoteReplacement;

/**
 * Created by priya on 19/08/17.
 */

public class PatternMatcher {

    public static void main(String[] args) {
        String str = "asda adfdf 5th February";
        System.out.println("Reached");

        SimpleDateFormat sdf = new SimpleDateFormat("d");
        Pattern p = Pattern.compile("([0-9]+)(st|nd|rd|th) (January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)");
        Matcher m = p.matcher(str);

        if(m.find()) {
            System.out.println(m.group(0));
        }

//        while (m.find()) {
//            System.out.println("Group 0: " + m.group(0) + " Group 1: " + m.group(1) + " Group 2: " + m.group(2));
//            //dateString = dateString.replaceAll(quoteReplacement(m.group(0)), m.group(1));
//        }

    }
}
