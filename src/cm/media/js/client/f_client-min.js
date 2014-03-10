gFormats=[{actions:["print"],extension:"html",label:gettext("print from the browser")},{actions:["export"],extension:"html",label:gettext("download html file (.html)")},{actions:["export"],extension:"markdown",label:gettext("download markdown file (.mkd)")},{actions:["print"],extension:"pdf",label:gettext("print in PDF format")},{actions:["export"],extension:"pdf",label:gettext("download portable object format file (.pdf)")},{actions:["export"],extension:"latex",label:gettext("download latex file (.tex)")},{actions:["export"],extension:"odt",label:gettext("download open document file (.odt)")},{actions:["export"],extension:"doc",label:gettext("download microsoft word file (.doc)")},{actions:["export"],extension:"docx",label:gettext("download microsoft word 2007 file (.docx)")}];var pandoc_version_ary=sv_pandoc_version.split(".");if(parseInt(pandoc_version_ary[0])>1||(parseInt(pandoc_version_ary[0])==1&&parseInt(pandoc_version_ary[1])>8)){gFormats.push({actions:["export"],extension:"epub",label:gettext("download ebook (.epub)")});}gFormats.push({actions:["export"],extension:"xml",label:gettext("download XML file for re-importing text and comments")});gActions={print:{dialogTitle:gettext("Print text"),chooseFormatLabel:gettext("How do you want to print?"),defaultMethod:"pdf",defaultWithColors:"no",defaultWhichComments:"all"},"export":{dialogTitle:gettext("Export text"),chooseFormatLabel:gettext("Choose file format"),defaultMethod:"pdf",defaultWithColors:"no",defaultWhichComments:"all"}};gCurrentAction=null;_populateMethod=function(g){var f=$("#p_method").val();$("#p_method").html("");for(var d=0,c=gFormats.length;d<c;d++){var e=gFormats[d]["actions"];for(var b=0,a=gFormats.length;b<a;b++){if(e[b]==gCurrentAction){$("<option value='"+gFormats[d]["extension"]+"'>"+gFormats[d]["label"]+"</option>").appendTo("#p_method");}}}if(f){$("#p_method").val(f);}else{$("#p_method").val(gActions[gCurrentAction]["defaultMethod"]);}};_populateMarkersColorsChoice=function(b){var a=$("#p_color").val();$("#p_color").html("");$("<option value='0'>"+gettext("using markers only, no background colors")+"</option>").appendTo("#p_color");$("<option value='1'>"+gettext("using markers and background colors")+"</option>").appendTo("#p_color");if(a){$("#p_color").val(a);}else{$("#p_color").val(gActions[gCurrentAction]["defaultWithColors"]);}};_populateWhichComments=function(){var c=$("#p_comments").val();$("#p_comments").html("");var a=interpolate(gettext("all (%(nb_comments)s)"),{nb_comments:frames.text_view_comments.gDb.getCommentsNb(true)},true);var b=interpolate(gettext("current filtered ones (%(nb_comments)s)"),{nb_comments:frames.text_view_comments.gDb.getCommentsNb(false)},true);$("<option value='all' >"+a+"</option>").appendTo($("#p_comments"));$("<option value='none' >"+gettext("none (0)")+"</option>").appendTo($("#p_comments"));$("<option value='filtered' >"+b+"</option>").appendTo($("#p_comments"));if(c){$("#p_comments").val(c);}else{$("#p_comments").val(gActions[gCurrentAction]["defaultWhichComments"]);}};_manageMarkersColorsChoice=function(){var f=$("#p_method").val();var e=$("#p_comments").val();var c=frames.text_view_comments.gDb.getCommentsNb(true);var d=frames.text_view_comments.gDb.getCommentsNb(false);var b=(e=="all")?c:d;var a;if(gCurrentAction=="print"){a=((b==0)||(e=="none"));}if(gCurrentAction=="export"){a=((b==0)||(e=="none")||(f=="markdown")||(f=="latex")||(f=="epub")||(f=="odt")||(f=="doc")||(f=="xml"));}if(a){$("#p_color").val("no");}$("#p_color").prop("disabled",a);};_initPrintDialog=function(){$("#p_comments").add($("#p_method")).change(function(){_manageMarkersColorsChoice();_prepareOpenInNewWindow();});var a={};a[gettext("Go !")]=function(){var d=$("#p_comments").val();var c=$("#p_color").val();var e=$("#p_method").val();var b=(gCurrentAction=="export")?"1":(e=="html")?"0":"1";var f=$("#print_export_form").attr("target_action").replace(/FoRmAt/,e).replace(/DoWnLoAd/,b).replace(/WhIcHCoMmEnT/,d).replace(/WiThCoLoR/,c);$("#print_export_form").attr("action",f);document.print_export_form.submit();$(this).dialog("close");};a[gettext("Cancel")]=function(){$(this).dialog("close");};$("#dialog_print_export").dialog({bgiframe:true,autoOpen:false,width:500,modal:true,buttons:a,close:function(){}});};openPrintDialog=function(){_openPrintExportDialog("print");};openExportDialog=function(){_openPrintExportDialog("export");};_prepareOpenInNewWindow=function(){var a=$("#p_method").val();if((a=="html")&&(gCurrentAction=="print")){$("#print_export_form").attr("target","_blank");}else{$("#print_export_form").removeAttr("target");}};_openPrintExportDialog=function(a){gCurrentAction=a;$("#ui-dialog-title-dialog_print_export").html(gActions[gCurrentAction]["dialogTitle"]);$("#how").html(gActions[gCurrentAction]["chooseFormatLabel"]);$("#print_export_action").val(a);_populateWhichComments();_populateMarkersColorsChoice();_populateMethod();_manageMarkersColorsChoice();_prepareOpenInNewWindow();$("#dialog_print_export").dialog("open");};onFadeEnd=function(){$(this).remove();};gLoadingMsg=null;enqueueLoadingMsg=function(){gLoadingMsg=_enqueueMsg(gettext("loading..."),"",null);};removeLoadingMsg=function(){if(gLoadingMsg!=null){gLoadingMsg.remove();gLoadingMsg=null;}};_enqueueMsg=function(d,b,c){var a=$("<span>"+d+"</span>").appendTo("#c-msg-wrapper").addClass("f-msg-cls").addClass(b);if(c){a.animate({opacity:0.95},c).fadeOut(2000,onFadeEnd);}return a;};enqueueMsg=function(c){var a="f-msg";var b=8000;_enqueueMsg(c,a,b);};enqueueErrorMsg=function(c){var a="f-msg-e";var b=4000;_enqueueMsg(c,a,b);};var gResetOtherFieldsOnFilterFieldChange=true;var myDefaultOuterLayoutSettings={center:{paneSelector:"#outer-center"},north:{size:50,spacing_open:0,closable:false,resizable:false}};var innerNorthPaneDefaults={innerNorthPaneOpened:"0",selectedTab:"0"};onInnerNorthPaneClose=function(){_setCookie("innerNorthPaneOpened","0");$("#add_comment_btn").css("top",63);if(document.getElementById("text_view_comments").contentDocument!=null){document.getElementById("text_view_comments").contentDocument.getElementById("the-toc").style.height=(parseInt(document.getElementById("text_view_comments").clientHeight)-50).toString()+"px";}return true;};onInnerNorthPaneOpen=function(){_setCookie("innerNorthPaneOpened","1");$("#add_comment_btn").css("top",159);if(document.getElementById("text_view_comments").contentDocument!=null){document.getElementById("text_view_comments").contentDocument.getElementById("the-toc").style.height=(parseInt(document.getElementById("text_view_comments").clientHeight)-50).toString()+"px";}return true;};var myDefaultInnerLayoutSettings={north:{size:98,spacing_open:8,spacing_closed:8,slidable:false,resizable:false,togglerLength_closed:"100%",togglerLength_open:"100%",togglerAlign_closed:"center",togglerTip_closed:gettext("click to show options"),togglerTip_open:gettext("click to hide options"),togglerContent_open:"<img alt='arrow up' src='"+sv_media_url+"img/arrow-up.png' />",togglerContent_closed:"<img alt='arrow down' src='"+sv_media_url+"img/arrow-down.png' />",initClosed:false,paneSelector:".inner-north",onopen:"onInnerNorthPaneOpen",onclose:"onInnerNorthPaneClose"}};var outerLayout,innerLayout;layoutFrames=function(){var a=$.cookie("innerNorthPaneOpened");myDefaultInnerLayoutSettings.north.initClosed=(a===null)?(innerNorthPaneDefaults.innerNorthPaneOpened=="0"):(a=="0");outerLayout=$("body").layout(myDefaultOuterLayoutSettings);innerLayout=$("#outer-center").layout(myDefaultInnerLayoutSettings);if(myDefaultInnerLayoutSettings.north.initClosed){onInnerNorthPaneClose();}else{onInnerNorthPaneOpen();}};fillFilterTab=function(){var b=$("#c_filter");var a='<div style="float:right"><table><tr><td style="text-align:right;">'+gettext("Text")+'<td>&nbsp;</td><td><input id="filter_text" type="text"></input><input id="c_filter_btn" type="button" value="'+gettext("Search")+'"></input></td></tr><tr><td colspan="3" style="text-align:right;"><input id="c_filterreset_btn" type="button" value="'+gettext("Reset")+'"></input><input id="c_filterhideall_btn" type="button" value="'+gettext("Hide all Comments")+'"></input></td></tr></table></div><table><tr><td style="text-align:right;">'+gettext("Authors")+'</td><td>&nbsp;</td><td><select id="filter_name"></select></td><td>&nbsp;</td><td style="text-align:right;">'+gettext("States")+'</td><td>&nbsp;</td><td><select id="filter_state"></select></td></tr><tr><td style="text-align:right;">'+gettext("Dates")+'</td><td>&nbsp;</td><td><select id="filter_date"></select></td><td>&nbsp;</td><td style="text-align:right;">'+gettext("Tags")+'</td><td>&nbsp;</td><td><select id="filter_tag"></select></td><tr><td style="text-align:right;"><span id="filter_cat_label">'+gettext("Categories")+'</span></td><td>&nbsp;</td><td><select id="filter_cat"></select></td></tr></table>';b.append($(a));$("#c_filter input[type='text']").add("#c_filter select").addClass("c_filter_field");$("#filter_name").add("#filter_date").add("#filter_tag").add("#filter_cat").add("#filter_state").change(function(){if(frames.text_view_comments.readyForAction()){var c=$(this);frames.text_view_comments.checkForOpenedDialog(null,function(){applyFilter(c);});}});$("#c_filter_btn").click(function(){if(frames.text_view_comments.readyForAction()){var c=$("#filter_text");frames.text_view_comments.checkForOpenedDialog(null,function(){applyFilter(c);});}});$("#filter_text").keyup(function(c){if(c.keyCode==13){$("#c_filter_btn").click();}});$("#c_filterreset_btn").click(function(){if(frames.text_view_comments.readyForAction()){frames.text_view_comments.checkForOpenedDialog(null,function(){resetFilter();});}});$("#c_filterhideall_btn").click(function(){if(frames.text_view_comments.readyForAction()){frames.text_view_comments.checkForOpenedDialog(null,function(){frames.text_view_comments.hideAll();});}});};fillTopToolbar=function(){var l=$("#outer-north");var g=gettext("view previous comment");var h=gettext("view next comment");var k=gettext("view first comment");var b=gettext("view last next comment");var d=gettext("view all comments");var p=gettext("view all detached comments");var m=gettext("toggle advance interface");var r=gettext("toggle table of contents");var c=gettext("print document with/without comments");var q=gettext("export document with/without comments");var a=gettext("toggle full screen view");var i=gettext("text feed");var j=gettext("add a comment");var n='<div id="c-right-btn"><img id="c_fullscreen_btn" src="'+sv_media_url+'/img/arrow_out.png" title="'+a+'" alt="'+a+'"/><img id="c_print_btn" src="'+sv_media_url+'/img/printer.png" title="'+c+'" alt="'+c+'"/><img id="c_export_btn" src="'+sv_media_url+'/img/page_go.png" title="'+q+'" alt="'+q+'"/><a target="_blank" href="'+frames.text_view_comments.sv_text_feed_url+'"><img id="c_feed_btn" src="'+sv_media_url+'/img/feed.png" title="'+i+'" alt="'+i+'"/></a></div><div id="c-msg-wrapper"></div><table style="margin-bottom:.3em;"><tbody><tr><td><span id="c_filter_results" ><span id="c_browse_indx_scope">-</span><span id="c_browse_indx_modif_thread" style="display: none;">-</span>/<b>&nbsp;<span id="c_f_res_nb_dis"></span></b>&nbsp;<span id="c_f_res_nb_dis_txt"></span><span id="c_f_res_details">&nbsp;('+gettext("filter:")+'&nbsp;<span id="c_f_res_nb_com"></span>/<span id="c_f_res_nb_tot_com"></span>&nbsp;<span id="c_f_res_nb_com_txt"></span>&nbsp;<span id="c_f_res_nb_rep"></span>/<span id="c_f_res_nb_tot_rep"></span><span id="c_f_res_nb_rep_txt"></span>)</span></span></td><td><span id="browse_section">, '+gettext("browse by:")+' <select id="browse_by" style="margin-right: 7px;"><option value="scope">'+gettext("location")+'</option><option value="modif_thread">'+gettext("modification")+'</option></select></span></td><td style="width: 40px; text-align: right;"><a href="#" id="c_browse_first"><img title="'+k+'" alt="'+k+'" src="'+sv_media_url+'/img/control_fastbackward_blue.png"/></a><a href="#" id="c_browse_prev"><img title="'+g+'" alt="'+g+'" src="'+sv_media_url+'/img/control_playback_blue.png" style="margin-right: 3px;"/></a></td><td style="width: 44px; text-align: left; border-right: 1px dotted #b1b1b1;"><a href="#" id="c_browse_next"><img title="'+h+'" alt="'+h+'" src="'+sv_media_url+'/img/control_play_blue.png"/></a><a href="#" id="c_browse_last"><img title="'+b+'" alt="'+b+'" src="'+sv_media_url+'/img/control_fastforward_blue.png"/></a></td><td style="width: 20px; text-align: left;"><a href="#" id="c_browse_all"><img title="'+d+'" alt="'+d+'" src="'+sv_media_url+'/img/view_all.png" style="margin-left: 11px; margin-right: 8px;" /></a></td><td style="width: 20px; text-align: left;"><a href="#" id="c_browse_scope_removed"><img title="'+p+'" alt="'+p+'" src="'+sv_media_url+'/img/view_scope_removed2.png" style="margin-top: -8px; margin-right: 3px;" /></a></td><td style="width: 20px; text-align: left;"><a href="#" id="c_thread_unthread"><img id="c_thread_unthread_img" style="margin-right: 8px;"/></a></td><td style="width: 20px; text-align: left;"><a href="#" id="c_toc_btn"><img title="'+r+'" alt="'+r+'" src="'+sv_media_url+'/img/document_index.png"/></a></td></tr></tbody></table>';l.prepend($(n));$("#add_comment_btn").click(function(){if(frames.text_view_comments.readyForAction()){frames.text_view_comments.checkForOpenedDialog(null,function(){frames.text_view_comments.gSync.showCommentForm(null);});}});var f=function(){$("#browse_by option").each(function(){$("#c_browse_indx_"+this.value).hide();});$("#c_browse_indx_"+$("#browse_by").val()).show();};var e=$.cookie("browse_by");e=(e==null)?"location":e;_setCookie("browse_by",$("#browse_by").val());$("#browse_by option[value="+e+"]").prop("selected",true);f();$("#browse_by").change(function(){_setCookie("browse_by",$("#browse_by").val());f();});var o=function(s){if(frames.text_view_comments.readyForAction()){frames.text_view_comments.checkForOpenedDialog(null,function(){frames.text_view_comments.browse($("#browse_by").val(),s);});}};$("#c_browse_prev").click(function(){o("prev");});$("#c_browse_next").click(function(){o("next");});$("#c_browse_first").click(function(){o("first");});$("#c_browse_last").click(function(){o("last");});$("#c_browse_all").click(function(){if(frames.text_view_comments.readyForAction()){frames.text_view_comments.checkForOpenedDialog(null,function(){frames.text_view_comments.gSync.showAllComments();});}});$("#c_browse_scope_removed").click(function(){if(frames.text_view_comments.readyForAction()){frames.text_view_comments.checkForOpenedDialog(null,function(){frames.text_view_comments.gSync.showScopeRemovedComments();});}});$("#c_print_btn").click(function(){if(frames.text_view_comments.readyForAction()){var s=frames.text_view_comments.gDb.getFilteredCommentIdsAsString();frames.text_view_comments.CY.log($("#filteredIds").val(s));openPrintDialog();}});$("#c_export_btn").click(function(){if(frames.text_view_comments.readyForAction()){var s=frames.text_view_comments.gDb.getFilteredCommentIdsAsString();frames.text_view_comments.CY.log($("#filteredIds").val(s));openExportDialog();}});if(frames.text_view_comments.gLayout.isInComentSite()){$("#c_fullscreen_btn").click(function(){toggleFrameSize();});}$("#c_advanced_btn").click(function(){$(".ui-layout-toggler").click();});setThreadPref=function(){var t=frames.text_view_comments.c_readPreference("comments","threadpad");var u=sv_media_url+"/img/unthread_box.png";var s=gettext("unthread discussions");if(t=="0"){u=sv_media_url+"/img/thread_box.png";s=gettext("thread discussions");}$("#c_thread_unthread_img").attr("src",u).attr("alt",s).attr("title",s);};setThreadPref();$("#c_thread_unthread").click(function(){var t=frames.text_view_comments.c_readPreference("comments","threadpad");var s=(t=="0")?"1":"0";frames.text_view_comments.c_persistPreference("comments","threadpad",s);setThreadPref();frames.text_view_comments.gSync.animateToTop();});$("#c_toc_btn").click(function(){if(frames.text_view_comments.readyForAction()){frames.text_view_comments.checkForOpenedDialog(null,function(){frames.text_view_comments.toggleTocFn();});}});};onSliderStop=function(){var a=$("#c_slider").slider("value");if(a>(frames.text_view_comments.gConf.sliderFixedMin*100)){$("#c_slider").slider("value",[90]);}if(a<(frames.text_view_comments.gConf.sliderFixedMax*100)){$("#c_slider").slider("value",[10]);}frames.text_view_comments.c_setCommentsColWidth(a);frames.text_view_comments.c_persistPreference("layout","comments_col_width",a);};fillTextPreferencesTab=function(){var d=$("#c_text_preferences");d.append($("<table><tr><td>"+gettext("Text style")+'</td><td>&nbsp;</td><td><select id="c_textpref_style"></select></td></tr></table>'));var e=frames.text_view_comments.gTextStyles;for(var c in e){$("#c_textpref_style").append($("<option value='"+c+"'>"+e[c]+"</option>"));}var a=function(){var g=frames.text_view_comments.gTextStyles;var h=$("#c_textpref_style").val();for(var f in g){if(f==h){frames.text_view_comments.CY.one("#textcontainer").addClass(f);}else{frames.text_view_comments.CY.one("#textcontainer").removeClass(f);}}};var b=function(){var f=frames.text_view_comments.c_readPreference("text","style");$("#c_textpref_style").val(f);};$("#c_textpref_style").change(function(f){frames.text_view_comments.c_persistPreference("text","style",$("#c_textpref_style").val());a();});b();a();};fillPreferencesTab=function(){var b=$("#c_preferences");var a='<div style="float:right"><input id="c_pref_save_btn" type="button" value="'+gettext("Save")+'"></input><input id="c_pref_reset_btn" type="button" value="'+gettext("Reset")+'"></input></div><table><tr><td>'+gettext("Animation duration")+'</td><td>&nbsp;</td><td><input id="c_pref_animduration" type="text" style="width:3em" value="" /></td></tr><tr><td><span class="frame_helptext">'+gettext("(0.001 to 1 second)")+"</span></td><td></td><td></td></tr></table>";b.append($(a));setPreferencesFieldsValue=function(){var c=frames.text_view_comments.c_readPreference("general","animduration");$("#c_pref_animduration").val(c);};setPreferencesFieldsValue();$("#c_pref_animduration").blur(function(){var c=parseFloat($(this).val());if(isNaN(c)||(c<=0)||(c>1)){c=frames.text_view_comments.c_readDefaultPreference("general","animduration");}$(this).val(c);});$("#c_pref_reset_btn").click(function(){frames.text_view_comments.c_resetPreferences(["general"]);setPreferencesFieldsValue();enqueueMsg(gettext("preferences reset (will apply on next load)"));});$("#c_pref_save_btn").click(function(){frames.text_view_comments.c_persistPreference("general","animduration",$("#c_pref_animduration").val());enqueueMsg(gettext("preferences saved (will apply on next load)"));});};initFrame=function(){_initYesNoDialog();_initPrintDialog();$(window).resize(function(){onSliderStop();});$("#c_slider").slider({animate:true,range:"min",value:frames.text_view_comments.c_readPreference("layout","comments_col_width"),min:1,iframeFix:true,max:100,slide:function(a,b){var c=b.value;frames.text_view_comments.c_setCommentsColWidth(c);},stop:function(a,b){onSliderStop();}});_initTabs();f_interfaceFreeze();};_initTabs=function(){$(".inner-north").tabs();var a=$.cookie("selectedTab");a=(a===null)?innerNorthPaneDefaults.selectedTab:parseInt(a);$(".inner-north").tabs("option","active",a);$(".inner-north").bind("tabsactivate",function(b,c){_setCookie("selectedTab",c.index);});};_initYesNoDialog=function(){$("#dialog_h").dialog({autoOpen:false,modal:true});};_setCookie=function(a,c){var b=new Date();b.setFullYear(2100,0,1);$.cookie(a,c,{expires:b,path:"/"});};f_getFrameFilterData=function(){var d=$("#filter_name").val();var c=$("#filter_date").val();var f=$("#filter_text").val();var b=$("#filter_tag").val();var a=$("#filter_cat").val();var e=$("#filter_state").val();return{name:d,date:c,text:f,tag:b,cat:a,state:e};};f_setFilterValue=function(a){for(key in a){if(key.indexOf("filter_")==0){$("#"+key).val(a[key]);}}};f_isFrameFilterFieldsInit=function(){var b=f_getFrameFilterData();var a=true;for(key in b){a=a&&(b[key]=="");}return a;};initFilterFields=function(){$(".c_filter_field").val("");};resetFilter=function(){initFilterFields();frames.text_view_comments.reinit();enqueueMsg(gettext("filter reset"));};applyFilter=function(a){var b=a.val();if(gResetOtherFieldsOnFilterFieldChange){initFilterFields();a.val(b);}frames.text_view_comments.reinit();enqueueMsg(gettext("filter applied"));};f_updateFilterCountResult=function(d,a,b,e,c){$("#c_f_res_nb_dis").html(d);$("#c_f_res_nb_dis_txt").html(ngettext("discussion","discussions",d));$("#c_f_res_nb_com").html(a);$("#c_f_res_nb_tot_com").html(e);$("#c_f_res_nb_com_txt").html(ngettext("comment","comments",a));$("#c_f_res_nb_rep").html(b);$("#c_f_res_nb_tot_rep").html(c);$("#c_f_res_nb_rep_txt").html("&nbsp;"+ngettext("reply","replies",b));$("#c_filter_results").show();};f_updateFilterCountDetailed=function(a){if(a){$("#c_f_res_details").show();$("c_browse_all").val("View all (filtered) comments");}else{$("#c_f_res_details").hide();$("#c_browse_all").val("View all comments");}};f_updateFilterData=function(f){var h=$("#filter_name option:selected").attr("name");var l=gettext("all");$("#filter_name option").remove();$("#filter_name").append($("<option name='c_f2_user_all' value=''>"+l+"</option>"));for(var c=0,b=f.names.length;c<b;c++){var m=f.names[c];$("#filter_name").append($("<option name='c_f2_user_"+m.name+"' value='"+m.name+"'>"+m.display+" ("+m.nb_comments+")</option>"));}$("#filter_name option[name="+h+"]").prop("selected",true);var a=$("#filter_date option:selected").attr("name");$("#filter_date option").remove();$("#filter_date").append($("<option name='c_f_date_all' value=''>"+l+"</option>"));for(var c=0,b=f.dates.length;c<b;c++){var m=f.dates[c];var g=ngettext("last 24 hours (%(nb_comments)s)","last %(nb_days)s days (%(nb_comments)s)",m.nb_day);var k=interpolate(g,{nb_days:m.nb_day,nb_comments:m.nb_comments},true);$("#filter_date").append($("<option name='c_f_date_"+m.nb_day+"' value='"+m.nb_day_date+"'>"+k+"</option>"));}$("#filter_date option[name="+a+"]").prop("selected",true);var j=$("#filter_tag option:selected").attr("name");$("#filter_tag option").remove();$("#filter_tag").append($("<option name='c_f2_tag_all' value=''>"+l+"</option>"));for(var c=0,b=f.tags.length;c<b;c++){var m=f.tags[c];$("#filter_tag").append($("<option name='c_f2_tag_"+m.name+"' value='"+m.name+"'>"+m.name+" ("+m.nb_comments+")</option>"));}$("#filter_tag option[name="+j+"]").prop("selected",true);var e=$("#filter_cat option:selected").attr("cat");$("#filter_cat option").remove();categories=frames.text_view_comments.CY.JSON.parse(frames.text_view_comments.sv_categories);if(categories.hasOwnProperty("0")){$("#filter_cat").append($("<option name='c_f2_cat_all' value=''>"+l+"</option>"));for(var c=0,b=f.categories.length;c<b;c++){var m=f.categories[c];if(categories[m.cat]!=null){$("#filter_cat").append($("<option name='c_f2_cat_"+m.cat+"' value='"+gettext(m.cat)+"'>"+categories[m.cat]+" ("+m.nb_comments+")</option>"));}}$("#filter_cat option[name="+e+"]").prop("selected",true);}else{$("#filter_cat").remove();$("#filter_cat_label").remove();}var d=$("#filter_state option:selected").attr("state");$("#filter_state option").remove();$("#filter_state").append($("<option name='c_f2_state_all' value=''>"+l+"</option>"));for(var c=0,b=f.states.length;c<b;c++){var m=f.states[c];$("#filter_state").append($("<option name='c_f2_state_"+m.state+"' value='"+m.state+"'>"+gettext(m.state)+" ("+m.nb_comments+")</option>"));}$("#filter_state option[name="+d+"]").prop("selected",true);};f_interfaceUnfreeze=function(){for(var b=0,a=$(".c_tab").length;b<a;b++){$(".inner-north").tabs("enable",b);}$(".inner-north select").add(".inner-north input").add("#outer-north select").add("#outer-north input").each(function(){$(this).prop("disabled",false);});$("#c_slider").slider("enable");};f_interfaceFreeze=function(){for(var b=0,a=$(".c_tab").length;b<a;b++){$(".inner-north").tabs("disable",b);}$(".inner-north select").add(".inner-north input").add("#outer-north select").add("#outer-north input").each(function(){$(this).prop("disabled",true);});$("#c_slider").slider("disable");};f_enqueueMsg=function(a){enqueueMsg(a);};f_enqueueErrorMsg=function(a){enqueueErrorMsg(a);};f_removeLoadingMsg=function(){removeLoadingMsg();};f_initFrame=function(){initFrame();};f_layoutFrames=function(){layoutFrames();};f_fillTextPreferencesTab=function(){fillTextPreferencesTab();};f_fillPreferencesTab=function(){fillPreferencesTab();};f_fillBrowseSection=function(){fillBrowseSection();};f_fillFilterTab=function(){fillFilterTab();};f_fillTopToolbar=function(){fillTopToolbar();};f_yesNoDialog=function(d,g,e,b,c,h,a,j){$("#dialog_h").html(d);$("#dialog_h").dialog("option","title",g);function k(){if(e!=null){e.call(b,c);}}function i(){if(h!=null){h.call(a,j);}}var f={};f[gettext("No")]=function(){$(this).dialog("close");k();};f[gettext("Yes")]=function(){$(this).dialog("close");i();};$("#dialog_h").dialog("option","buttons",f);$("#dialog_h").dialog("open");};f_setCookie=function(a,b){_setCookie(a,b);};gInFullScreen=false;_setFrameSize=function(){if(parent!=window){if(gInFullScreen){var b=parent.$("#header").height();var f=parent.$(parent).height();var c=(f-b-2)+"px";var d=parent.$(parent).width();var a=(d-2)+"px";parent.$("#text_view_frame").css({position:"absolute",left:"0px",top:b,width:a,height:c});}else{var e=Math.ceil(parent.$("#autoexpand_text_view_frame_container").position()["top"]);var f=parent.$(parent).height();var c=(f-e-2)+"px";var d=parent.$(parent).width();var a=(d-2)+"px";parent.$("#text_view_frame").css({position:"relative",width:"99.9%",height:c,top:"0px"});}}};_toFullScreenSize=function(){gInFullScreen=true;_setFrameSize();$("#c_fullscreen_btn").attr("src",sv_media_url+"/img/arrow_in.png");f_setCookie("fullscreen","1");};_toNormalSize=function(){gInFullScreen=false;_setFrameSize();$("#c_fullscreen_btn").attr("src",sv_media_url+"img/arrow_out.png");f_setCookie("fullscreen","0");};_toInitialSize=function(){var a=($.cookie("fullscreen")=="1");if(a){_toFullScreenSize();}else{_toNormalSize();}};toInitialSize=function(){_toInitialSize();parent.$(parent).resize(function(){_setFrameSize();});};toggleFrameSize=function(){if(gInFullScreen){_toNormalSize();}else{_toFullScreenSize();}};