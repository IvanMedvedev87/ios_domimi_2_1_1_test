var hello = "hello";

/* Выводим аватарку */
if (localStorage.getItem("user_ava") == null) {
	localStorage.setItem("user_ava", "ava_1558865807.png");
	$urlsrc = "https://domimi.ru/uploads/ava_1558865807.png";
	jQuery(".avauser").attr("src", $urlsrc);
} else {
	if (localStorage.getItem("user_ava") == "ava_1558865807.png") {
		$urlsrc = "https://domimi.ru/uploads/ava_1558865807.png";
		jQuery(".avauser").attr("src", $urlsrc);
	} else {
		$urlsrc = "https://domimi.ru/uploads/users/" + localStorage.getItem("userid") + "/" + localStorage.getItem("user_ava");
		jQuery(".avauser").attr("src", $urlsrc);
	}
}

/* Выравниваем блоки */
function rsblocks() {
	var height = 0;
	if ((jQuery("body").width() >= 751)) {
		height = 0;
		jQuery(".usl_content_info").each(function () {
			if ($(this).height() > height) {
				height = $(this).height();
			}
		});
		jQuery(".usl_content_info").height(height);
	}
}

function sortallindex() {
	var arr = [];
	jQuery(".sortfind").each(function (i, elem) {
		htmlcode = jQuery(this).html();
		htmlcode = '<td class="sortfind">' + htmlcode + '</td>';
		var c = arr.push(htmlcode);
		console.log(htmlcode);
	});

	var arr2 = [];
	jQuery(".uslugastylewidth").each(function (i2, elem) {
		htmlcode = jQuery(this).attr("sortnomer");
		var sortnomer = Math.floor(htmlcode);
		var c2 = arr2.push(sortnomer);
		console.log(c2);
	});

	var n = arr2.length;
	for (var i = 0; i < n - 1; i++) {
		for (var j = 0; j < n - 1 - i; j++) {
			if (arr2[j + 1] < arr2[j]) {
				var t = arr2[j + 1];
				arr2[j + 1] = arr2[j];
				arr2[j] = t;
				var tmain = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = tmain;
			}
		}
	}
	console.log(arr);
	jQuery(".insertuslugizilcov").html(arr);
	jQuery(".poiskuslugmob").html(arr);





	var arrreiting = [];
	jQuery(".sortfindreiting").each(function (i, elem) {
		htmlcoder = jQuery(this).html();
		htmlcoder = '<td class="sortfindreiting">' + htmlcoder + '</td>';
		var cr = arrreiting.push(htmlcoder);
		console.log(htmlcoder);
	});

	var arr2reiting = [];
	jQuery(".uslugastylewidthreiting").each(function (i2, elem) {
		htmlcoder = jQuery(this).attr("sortnomer");
		var sortnomerr = Math.floor(htmlcoder);
		var c2r = arr2reiting.push(sortnomerr);
		console.log(c2r);
	});

	var nr = arr2reiting.length;
	for (var ir = 0; ir < nr - 1; ir++) {
		for (var jr = 0; jr < nr - 1 - ir; jr++) {
			if (arr2reiting[jr + 1] < arr2reiting[jr]) {
				var tr = arr2reiting[jr + 1];
				arr2reiting[jr + 1] = arr2reiting[jr];
				arr2reiting[jr] = tr;
				var tmainr = arrreiting[jr + 1];
				arrreiting[jr + 1] = arrreiting[jr];
				arrreiting[jr] = tmainr;
			}
		}
	}

	jQuery(".reitingmob").html(arrreiting);


}

/* /////////////////////////////////////////////////////////////////////////////////*/
function get_location() {
	navigator.geolocation.getCurrentPosition(show_map);
}
function show_map(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	console.log("Широта: " + latitude + " Долгота: " + longitude);

	localStorage.setItem("latitude", latitude);
	localStorage.setItem("longitude", longitude);

	var arrloc = [];
	var line = {};
	line = {
		"latitude": latitude,
		"longitude": longitude
	}
	arrloc.push(line);
	z = JSON.stringify(arrloc);
	return z;
}
/* /////////////////////////////////////////////////////////////////////////////////*/


function uslugi_index() {
	jQuery.ajax({
		url: "https://domimi.ru/uslugijilcov.php",
		type: "post",
		data: {
			"hello": hello
		},
		success: function (rezul) {
			jQuery(".insertuslugizilcov").html(rezul);
			/* jQuery(".poiskuslugmob").html(rezul); */
		}
	});


	jQuery.ajax({
		url: "https://domimi.ru/reiting.php",
		type: "post",
		data: {
			"hello": hello
		},
		success: function (rezul) {
			jQuery(".reitingmob").html(rezul);
		}
	});

	if (localStorage.getItem("userid") == null || localStorage.getItem("userid") == "") {
		$userid = "userid";
		jQuery.ajax({
			url: "https://domimi.ru/userloginpas.php",
			type: "post",
			data: {
				"userid": $userid
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				localStorage.setItem("userid", obj.userid);
				localStorage.setItem("loguser", obj.loguser);
				localStorage.setItem("pass", obj.pass);
			}
		});
	}

	if (localStorage.getItem("namejk") == "") {
		localStorage.setItem("namejk", "Не выбран ЖК");
	}

	if (localStorage.getItem("user_ava") == null) {
		localStorage.setItem("user_ava", "ava_1558865807.png");
	}



	if (localStorage.getItem("userid") == null) {
		location.href = "befor_auth.html";
	}

	if ((localStorage.getItem("cityid") == null) && (localStorage.getItem("userid") !== null)) {
		location.href = "citychoose.html";
	}

	if (((localStorage.getItem("ulica") == null) && (localStorage.getItem("namejk") !== null) && (localStorage.getItem("cityid") !== null)) || (localStorage.getItem("ulica") == "")) {
		location.href = "adress.html";
	}

	if ((localStorage.getItem("nameuser") == null) && (localStorage.getItem("ulica") !== null)) {
		location.href = "nameuser.html";
	}


	setTimeout(sortallindex, 1500);
}


function selectuslug() {
	jQuery.ajax({
		url: "https://domimi.ru/selectuslug.php",
		type: "post",
		data: {
			"hello": hello
		},
		success: function (rezul) {
			jQuery(".insertcelectusl").html(rezul);
		}
	});
}

function selectcity() {
	jQuery.ajax({
		url: "https://domimi.ru/selectcity.php",
		type: "post",
		data: {
			"hello": hello
		},
		success: function (rezul) {
			jQuery(".insertcelectcity").html(rezul);
		}
	});
}

function selectjk() {
	/* console.log("Сработал селект ЖК"); */
	namecity = localStorage.getItem("namecity");
	jQuery(".dobavleniye_uslugi").text(namecity);
	/* console.log(namecity); */
	jQuery.ajax({
		url: "https://domimi.ru/selectjk.php",
		type: "post",
		data: {
			"namecity": namecity
		},
		success: function (rezul) {
			jQuery(".insertcelectjk").html(rezul);
		}
	});

}

/* jQuery(".useraddjk").on("click", function(){
	location.href = "useraddjk.html";
}); */






jQuery(".insertcelectusl").on("click", ".circle", function () {
	jQuery(".circle").removeClass("circbacground");
	jQuery(this).addClass("circbacground");
	var id = jQuery(this).attr("data-id");
	var nameusl = jQuery(this).parent("td").parent("tr").children("td").eq(1).children(".nameuslselect").text();
	console.log(id);
	console.log(nameusl);
	localStorage.setItem("uslid", id);
	localStorage.setItem("nusl", nameusl);
});

jQuery(".insertcelectcity").on("click", ".circle", function () {
	jQuery(".circle").removeClass("circbacground");
	jQuery(this).addClass("circbacground");
	var id = jQuery(this).attr("data-id");
	var namecity = jQuery(this).parent("td").parent("tr").children("td").eq(0).children(".namecityselect").text();
	console.log(id);
	console.log(namecity);

	if (jQuery(".newstyleaddusl").hasClass("ahrefgrey")) {
		console.log("Сработало условие");
		jQuery(".newstyleaddusl").removeClass("ahrefgrey");
		jQuery(".newstyleaddusl").addClass("ahrefyel");
	}


	if ((id !== "") && (namecity !== "")) {
		localStorage.setItem("cityid", id);
		localStorage.setItem("namecity", namecity);
		localStorage.setItem("namejk", "Не выбран ЖК");
		localStorage.setItem("jkid", "");
	} else {
		alert("Не выбран город");
	}
});


jQuery(".addcitytext").on("click", function () {
	var cityid = jQuery(this).attr("data-id");
	var namecity = jQuery(this).parent("td").parent("tr").children("td").eq(1).children(".namecityselect").text();
	console.log(cityid);
	console.log(namecity);

	if (jQuery(".circle").hasClass("circbacground")) {
		location.href = "jkchoose.html";
	} else {
		alert("Не выбран город");
	}
});

jQuery(".addcitytext2").on("click", function () {
	location.href = "dob-uslugi.html";
});
jQuery(".addcitytext3").on("click", function () {
	location.href = "ichuuslugu.html";
});

jQuery(".nameuslugi").val(localStorage.getItem("nusl"));
jQuery(".nameuslugi2").val(localStorage.getItem("nusl"));

jQuery(".nameuslugi").on("click", function () {
	location.href = "razdelpomochi.html";
});
jQuery(".nameuslugi2").on("click", function () {
	location.href = "razdelpomochi2.html";
});



if (localStorage.getItem("namecity") !== null && localStorage.getItem("namejk") !== null) {
	jQuery(".jkcity").text(localStorage.getItem("namecity"));
	jQuery(".jkinfo").text(localStorage.getItem("namejk"));
} else {
	/* localStorage.setItem("cityid","1"); */
	localStorage.setItem("namecity", "Город не выбран");
	/* 	localStorage.setItem("jkid","1"); */
	localStorage.setItem("namejk", "Не выбран ЖК");
}

jQuery(".namecity2").val(localStorage.getItem("namecity"));
/* jQuery(".namecity2").on("click", function(){
	location.href = "citychoose2.html";
}); */

jQuery(".namecity3").val(localStorage.getItem("namecity"));
/* jQuery(".namecity3").on("click", function(){
	location.href = "citychoose3.html";
}); */

jQuery(".userjilc").val(localStorage.getItem("namejk"));

jQuery(".insertcelectjk").on("click", ".circlejk", function () {
	jQuery(".circlejk").removeClass("circbacground");
	jQuery(this).addClass("circbacground");
	var jkid = jQuery(this).attr("data-id");
	var namejk = jQuery(this).parent("td").parent("tr").children("td").eq(1).children(".namejkselect").text();
	console.log(jkid);
	console.log(namejk);
	if ((jkid !== "") && (namejk !== "")) {
		if (jkid == 0) { namejk = "Не выбран ЖК" }
		localStorage.setItem("jkid", jkid);
		localStorage.setItem("namejk", namejk);
	} else {
		alert("Не выбран город");
	}
});

jQuery(".addjktext").on("click", function () {
	var jkid = jQuery(".circbacground").attr("data-id");
	var namejk = jQuery(".circbacground").parent("td").parent("tr").children("td").eq(1).children(".namejkselect").text();
	console.log(jkid);
	console.log(namejk);
	if (jQuery(".circlejk").hasClass("circbacground")) {
		if (jkid == 0) {
			location.href = "useraddjk.html";;
		} else {
			location.href = "index.html";
		}

	} else {
		alert("Не выбран Жилищный колмплекс");
	}
});


jQuery(".useraddjkbd").on("click", function (e) {
	e.preventDefault();
	var cityjkadd = jQuery(".namecity3").val();
	var namejkadd = jQuery(".userjilcadd").val();
	if (confirm('Ваш жилищный комплекс "' + namejkadd + '"?')) {
		localStorage.setItem("namejk", namejkadd);

		if ((namejkadd !== "undefined") && (cityjkadd !== "undefined")) {
			jQuery.ajax({
				url: "https://domimi.ru/adminpanel/add_jilc/add_jilc.php",
				type: "post",
				data: {
					"namejkadd": namejkadd,
					"cityjkadd": cityjkadd
				},
				success: function (rezul) {
					var obj = JSON.parse(rezul);
					if (obj.rezultstatus == 1) {
						alert(obj.rezultmes);
						location.href = "jkchoose.html";
					} else {
						alert(obj.rezultmes);
					}
				}
			});

		}
	} else {
		localStorage.setItem("namejk", "Не выбран ЖК");
		localStorage.setItem("jkid", "");
	}
});

/* jQuery(".nolisthref").on('click',function(){
	location.href = "useraddjk.html";
}); */

/* jQuery(".predlojituslugu").on("click", function (e) {
	e.preventDefault();
	if (localStorage.getItem("jkid") == 0) {
		alert("У вас не выбран жилищный комплекс");
	} else {
		location.href = "dob-uslugi.html";
	}
}); */

/* jQuery(".zakazat").on("click", function (e) {
	e.preventDefault();
	if (localStorage.getItem("jkid") == 0) {
		alert("У вас не выбран жилищный комплекс");
	} else {
		location.href = "ichuuslugu.html";
	}
}); */

jQuery(".injksettings").text(localStorage.getItem("namejk"));


jQuery(".loginuser").text(localStorage.getItem("loguser"));
jQuery(".pasuser").text(localStorage.getItem("pass"));

/* Изменение данных changedetails.html старт*/
jQuery(".changeloginuser").val(localStorage.getItem("loguser"));
jQuery(".changepasuser").val(localStorage.getItem("pass"));
jQuery(".changenameuser").val(localStorage.getItem("nameuser"));
jQuery(".changefamuser").val(localStorage.getItem("famuser"));
jQuery(".changeemailuser").val(localStorage.getItem("emailuser"));
jQuery(".changeteluser").val(localStorage.getItem("teluser"));
jQuery(".changecityuser").val(localStorage.getItem("namecity"));
jQuery(".changejkuser").val(localStorage.getItem("namejk"));


jQuery(".updatechange").on("click", function () {
	var userid = localStorage.getItem("userid");
	var loginuser = jQuery(".changeloginuser").val();
	var pass = jQuery(".changepasuser").val();
	var nameuser = jQuery(".changenameuser").val();
	var famuser = jQuery(".changefamuser").val();
	var emailuser = jQuery(".changeemailuser").val();
	var teluser = jQuery(".changeteluser").val();
	var namecity = jQuery(".changecityuser").val();
	var namejk = jQuery(".changejkuser").val();

	var cityid = localStorage.getItem("cityid");
	var jkid = localStorage.getItem("jkid");

	var ulica = jQuery(".changeulicauser").val();
	var dom = jQuery(".changedomuser").val();
	var kv = jQuery(".changekvuser").val();

	/* location */
	if ((localStorage.getItem("latitude") !== "") && (localStorage.getItem("longitude") !== "") && (localStorage.getItem("latitude") !== null) && (localStorage.getItem("longitude") !== null)) {
		var latitude = localStorage.getItem("latitude");
		var longitude = localStorage.getItem("longitude");
	} else {
		var latitude = "";
		var longitude = "";
	}



	if ((userid !== "") && (loginuser !== "") && (pass !== "")) {
		jQuery.ajax({
			url: "https://domimi.ru/updatechange/updatechange.php",
			type: "post",
			data: {
				"userid": userid,
				"loginuser": loginuser,
				"pass": pass,
				"nameuser": nameuser,
				"famuser": famuser,
				"emailuser": emailuser,
				"teluser": teluser,
				"namecity": namecity,
				"namejk": namejk,
				"latitude": latitude,
				"longitude": longitude,
				"ulica": ulica,
				"dom": dom,
				"kv": kv,
				"cityid": cityid,
				"jkid": jkid

			},
			success: function (rezul) {
				var obj_updatechange = JSON.parse(rezul);
				alert(obj_updatechange.rezultmes);
				if (obj_updatechange.rezultstatus == 1) {
					localStorage.setItem("pass", obj_updatechange.pass);
					localStorage.setItem("nameuser", obj_updatechange.nameuser);
					localStorage.setItem("famuser", obj_updatechange.famuser);
					localStorage.setItem("emailuser", obj_updatechange.emailuser);
					localStorage.setItem("teluser", obj_updatechange.teluser);
					localStorage.setItem("namecity", obj_updatechange.namecity);
					localStorage.setItem("namejk", obj_updatechange.namejk);

					localStorage.setItem("cityid", obj_updatechange.cityid);
					localStorage.setItem("jkid", obj_updatechange.jkid);

					localStorage.setItem("ulica", obj_updatechange.ulica);
					localStorage.setItem("dom", obj_updatechange.dom);
					localStorage.setItem("kv", obj_updatechange.kv);

					location.reload();
				} else {
					console.log(rezul);
				}
			}
		});
	}
});
/* Изменение данных changedetails.html финиш*/


/* Загрузить, обновить аватарку юзера */
jQuery(".updateavachange").on("click", function (e) {
	e.preventDefault();
	if (localStorage.getItem("userid") !== "") {
		var id = localStorage.getItem("userid");
		var imgfile = jQuery(".changefilenuser").val();
		loadfile = jQuery(".changefilenuser").prop('files')[0];
		if (imgfile == "") {
			alert("Вы не выбрали файл аватарки");
		}

		var form_data = new FormData();
		form_data.append('imgfile', imgfile);
		form_data.append('user_id', id);
		form_data.append('file', loadfile);


		jQuery.ajax({
			url: "https://domimi.ru/loadava/loadava.php",
			type: "post",
			dataType: 'text',
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,

			success: function (rezul) {
				var objimg = JSON.parse(rezul);
				alert(objimg.rezultmes);
				if (objimg.rezultstatus == 1) {
					console.log(rezul);
					localStorage.setItem("user_ava", objimg.filename);
					location.reload();
				} else {
					console.log(rezul);
				}
			}
		});
	} else {
		alert("Вы заполнили не все необходимые данные");
	}
});




jQuery(".changecityuser").on("click", function () {
	location.href = "set_citychoose.html";
});
jQuery(".set_addcitytext").on("click", function () {
	location.href = "set_jkchoose.html";
});
jQuery(".set_addjktext").on("click", function () {
	location.href = "changedetails.html";
});
jQuery(".changejkuser").on("click", function () {
	location.href = "set_jkchoose.html";
});


jQuery(".userfio").val(localStorage.getItem("nameuser"));
jQuery(".teluslugi").val(localStorage.getItem("teluser"));




jQuery(".addusltext").on("click", function () {
	location.href = "dob-uslugi.html";
});

jQuery(".addusltext2").on("click", function () {
	location.href = "ichuuslugu.html";
});





jQuery(".addusltext12").on("click", function () {

	var nameuslugi = jQuery(".nameuslugi").val();
	var userfio = jQuery(".userfio").val();
	var namecity = jQuery(".namecity2").val();
	var userjilc = jQuery(".userjilc").val();
	var infouslugi = jQuery(".infouslugi").val();
	var teluslugi = jQuery(".teluslugi").val();
	var cityid = localStorage.getItem("cityid");
	var jkid = localStorage.getItem("jkid");
	var userid = localStorage.getItem("userid");
	var uslid = localStorage.getItem("uslid");
	var user_ava = localStorage.getItem("user_ava");



	if ((nameuslugi !== "") && (userfio !== "") && (namecity !== "") && (userjilc !== "") && (infouslugi !== "") && (teluslugi !== "")) {
		jQuery.ajax({
			url: "https://domimi.ru/dob-uslugi.php",
			type: "post",
			data: {
				"nameuslugi": nameuslugi,
				"userfio": userfio,
				"namecity": namecity,
				"userjilc": userjilc,
				"infouslugi": infouslugi,
				"teluslugi": teluslugi,
				"cityid": cityid,
				"jkid": jkid,
				"userid": userid,
				"uslid": uslid,
				"user_ava": user_ava
			},
			success: function (rezul) {
				var objusl = JSON.parse(rezul);
				alert(objusl.rezultmes);
				if (objusl.rezultstatus == 1) {

					location.href = "index.html";
				} else {
					console.log(rezul);
				}
			}
		});

	} else {
		alert("Какое-то из данных не заполнено, проверьте заполено ли имя в профиле.");
	}
});



jQuery(".addusltext13").on("click", function () {

	var nameuslugi = jQuery(".nameuslugi2").val();
	var userfio = jQuery(".userfio").val();
	var namecity = jQuery(".namecity3").val();
	var userjilc = jQuery(".userjilc").val();
	var infouslugi = jQuery(".infouslugi").val();
	var teluslugi = jQuery(".teluslugi").val();
	var cityid = localStorage.getItem("cityid");
	var jkid = localStorage.getItem("jkid");
	var userid = localStorage.getItem("userid");
	var uslid = localStorage.getItem("uslid");
	var user_ava = localStorage.getItem("user_ava");



	if ((nameuslugi !== "") && (userfio !== "") && (namecity !== "") && (userjilc !== "") && (infouslugi !== "") && (teluslugi !== "")) {
		jQuery.ajax({
			url: "https://domimi.ru/ichuuslugu.php",
			type: "post",
			data: {
				"nameuslugi": nameuslugi,
				"userfio": userfio,
				"namecity": namecity,
				"userjilc": userjilc,
				"infouslugi": infouslugi,
				"teluslugi": teluslugi,
				"cityid": cityid,
				"jkid": jkid,
				"userid": userid,
				"uslid": uslid,
				"user_ava": user_ava
			},
			success: function (rezul) {
				var objichu = JSON.parse(rezul);
				alert(objichu.rezultmes);
				if (objichu.rezultstatus == 1) {

					location.href = "index.html";
				} else {
					console.log(rezul);
				}
			}
		});

	} else {
		alert("Какое-то из данных не заполнено, проверьте заполено ли имя в профиле.");
	}
});



jQuery(".svgpoisk").on("click", function () {
	localation.href = "citychoose.html";
});


jQuery(".insertuslugizilcov").on("click", ".uslugastylewidth", function () {
	var uslidpredloj = jQuery(this).attr("data-id");
	var uslnamepredloj = jQuery(this).children(".nameuslindex").text();
	localStorage.setItem("uslidpredloj", uslidpredloj);
	localStorage.setItem("uslnamepredloj", uslnamepredloj);   								/* Услуга по которой производится поиск. Предложение */
	location.href = "spisokpredloj.html";
});

jQuery(".poiskuslugmob").on("click", ".uslugastylewidth", function () {
	/* 	var uslidpoisk = jQuery(this).attr("data-id");
		localStorage.setItem("uslidpoisk", uslidpoisk);  	 */							/* Услуга по которой производится поиск. Поиск услуги */

	var uslidpredloj = jQuery(this).attr("data-id");
	var uslnamepredloj = jQuery(this).children(".nameuslindex").text();
	localStorage.setItem("uslidpredloj", uslidpredloj);
	localStorage.setItem("uslnamepredloj", uslnamepredloj);

	location.href = "spisokichu.html";
});


function vibor_contaner() {
	jQuery(".vibor_contaner").on("click", function () {
		jQuery(".vibor_contaner").removeClass("displayoff");
		jQuery(".vibor_contaner_tel").addClass("displayoff");
		jQuery(this).addClass("displayoff");
		jQuery(this).parent(".new_stylerow").children(".vibor_contaner_tel").removeClass("displayoff");
	});
}


function close_message() {
	jQuery(".inset_uslugi_jk_find").on("click", ".close_message", function () {
		jQuery(this).parent().parent().remove();
	});
}


function uslugi_jk_find() {
	var cityid = localStorage.getItem("cityid");
	var jkid = localStorage.getItem("jkid");
	var userid = localStorage.getItem("userid");
	var uslidpredloj = localStorage.getItem("uslidpredloj");
	var namecity = localStorage.getItem("namecity");

	if ((cityid !== "") && (jkid !== "") && (userid !== "") && (uslidpredloj !== "") && (cityid !== null) && (jkid !== null) && (userid !== null) && (uslidpredloj !== null)) {
		jQuery.ajax({
			url: "https://domimi.ru/uslugi_jk_find.php",
			type: "post",
			data: {
				"cityid": cityid,
				"jkid": jkid,
				"userid": userid,
				"uslidpredloj": uslidpredloj
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					jQuery(".inset_uslugi_jk_find").html(obj.rezultmes);
					if (obj.nouslug !== "game") {
						jQuery(".inset_uslugi_jk_find").html(obj.nouslug);
					}
					/* alert(obj.nouslug); */
					rsblocks();
					vibor_contaner();
				} else {
					alert(obj.rezultmes);
					vibor_contaner();
				}

			}
		});
	} else {
		alert("Проверьте все ли вы данные заполнили в настройках")
	}

	/* 	var string_predl1 = "Услуги жильцов г." + namecity + ": " + localStorage.getItem("uslnamepredloj");
		jQuery(".usl_name_predl1").text(string_predl1); */
	var string_predl1 = "Услуги: " + localStorage.getItem("uslnamepredloj");
	jQuery(".usl_name_predl1").text(string_predl1);

	close_message();
}


function uslugi_jk_ichu() {
	var cityid = localStorage.getItem("cityid");
	var jkid = localStorage.getItem("jkid");
	var userid = localStorage.getItem("userid");
	var uslidpredloj = localStorage.getItem("uslidpredloj");
	var namecity = localStorage.getItem("namecity");

	if ((cityid !== "") && (jkid !== "") && (userid !== "") && (uslidpredloj !== "") && (cityid !== null) && (jkid !== null) && (userid !== null) && (uslidpredloj !== null)) {
		jQuery.ajax({
			url: "https://domimi.ru/uslugi_jk_ichu.php",
			type: "post",
			data: {
				"cityid": cityid,
				"jkid": jkid,
				"userid": userid,
				"uslidpredloj": uslidpredloj
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					jQuery(".inset_uslugi_jk_find").html(obj.rezultmes);
					if (obj.nouslug !== "game") {
						jQuery(".inset_uslugi_jk_find").html(obj.nouslug);
					}
					rsblocks();
					vibor_contaner();
				} else {
					alert(obj.rezultmes);
					vibor_contaner();
				}

			}
		});
	} else {
		alert("Проверьте все ли вы данные заполнили в настройках")
	}

	/* var string_predl1 = "Жильцам г." + namecity + " необходима услуга: " + localStorage.getItem("uslnamepredloj");
	jQuery(".usl_name_predl1").text(string_predl1); */
	var string_predl1 = "Ищут: " + localStorage.getItem("uslnamepredloj");
	jQuery(".usl_name_predl1").text(string_predl1);

	close_message();
}


jQuery(".reloadpage").on("click", function () {
	location.reload();
});

/* Удаление пользовательских объявлений */
function del_myadvert() {
	jQuery(".del_contaner").on("click", function () {
		var userid = localStorage.getItem("userid");
		var uslid = jQuery(this).attr("data-myuslid");
		var loguser = localStorage.getItem("loguser");
		if ((userid !== "") && (userid !== null) && (uslid !== "") && (uslid !== null) && (loguser !== "") && (loguser !== null)) {
			jQuery.ajax({
				url: "https://domimi.ru/del_myadvert.php",
				type: "post",
				data: {
					"userid": userid,
					"uslid": uslid,
					"loguser": loguser
				},
				success: function (rezul) {
					console.log(rezul);
					var obj = JSON.parse(rezul);
					if (obj.rezultstatus == 1) {
						alert(obj.rezultmes);
						location.reload();
					} else {
						alert(obj.rezultmes);
					}
				}
			});
		} else {
			alert("Проверьте все ли вы данные заполнили в настройках")
		}
	});
}

/* Вывод пользовательских объявлений */
function myadvert() {
	var userid = localStorage.getItem("userid");

	if ((userid !== "") && (userid !== null)) {
		jQuery.ajax({
			url: "https://domimi.ru/myadvert.php",
			type: "post",
			data: {
				"userid": userid
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					jQuery(".inset_uslugi_jk_find").html(obj.rezultmes);
					rsblocks();
					del_myadvert();
				} else {
					alert(obj.rezultmes);
				}

			}
		});
	} else {
		alert("Проверьте все ли вы данные заполнили в настройках")
	}
}




/* Удаление пользовательских объявлений */
function del_myadvert_ichu() {
	jQuery(".del_contaner").on("click", function () {
		var userid = localStorage.getItem("userid");
		var uslid = jQuery(this).attr("data-myuslid");
		var loguser = localStorage.getItem("loguser");
		if ((userid !== "") && (userid !== null) && (uslid !== "") && (uslid !== null) && (loguser !== "") && (loguser !== null)) {
			jQuery.ajax({
				url: "https://domimi.ru/del_myadvert_ichu.php",
				type: "post",
				data: {
					"userid": userid,
					"uslid": uslid,
					"loguser": loguser
				},
				success: function (rezul) {
					console.log(rezul);
					var obj = JSON.parse(rezul);
					if (obj.rezultstatus == 1) {
						alert(obj.rezultmes);
						location.reload();
					} else {
						alert(obj.rezultmes);
					}
				}
			});
		} else {
			alert("Проверьте все ли вы данные заполнили в настройках")
		}
	});
}


/* Вывод пользовательских объявлений */
function myadvert_ichu() {
	var userid = localStorage.getItem("userid");

	if ((userid !== "") && (userid !== null)) {
		jQuery.ajax({
			url: "https://domimi.ru/myadvert_ichu.php",
			type: "post",
			data: {
				"userid": userid
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					jQuery(".inset_uslugi_jk_find").html(obj.rezultmes);
					rsblocks();
					del_myadvert_ichu();
				} else {
					alert(obj.rezultmes);
				}

			}
		});
	} else {
		alert("Проверьте все ли вы данные заполнили в настройках");
	}
}


/*/////////////////////////////////////////*/
/* Меняем высоту блоков для одинакового отображения */
function resizepage() {
	jQuery(window).resize(function () {
		location.reload();
		rsblocks();
		console.log("resize");
	});
}

/* //////////////////////////////////////// */


jQuery(".reitingmob").on("click", ".sortfindreiting", function () {
	var reiting_id = jQuery(this).children(".uslugastylewidthreiting").attr("data-id");
	var reiting_name = jQuery(this).children(".uslugastylewidthreiting").children(".nameuslindex").text();
	localStorage.setItem("reiting_id", reiting_id);
	localStorage.setItem("reiting_name", reiting_name);
	/* location.href = "reiting_addotziv.html"; */
	location.href = "reiting_sp_kv.html";
});



function reiting_otzivi() {

	var cityid = localStorage.getItem("cityid");
	var namecity = localStorage.getItem("namecity");
	var userid = localStorage.getItem("userid");
	var nameuser = localStorage.getItem("nameuser");

	var reiting_id = localStorage.getItem("reiting_id");
	var reiting_name = localStorage.getItem("reiting_name");

	jQuery(".ulica").val(localStorage.getItem("poisk_ulica"));
	jQuery(".dom").val(localStorage.getItem("poisk_dom"));
	jQuery(".kvartira").val(localStorage.getItem("poisk_kv"));

	/* var string_reiting = "Номинация \"" + reiting_name + "\" г. " + namecity; */
	var string_reiting = "Номинация \"" + reiting_name + "\"";
	jQuery(".reiting_otziv").text(string_reiting);

	jQuery("body").on("click", ".ostavit_otziv", function () {
		/* 		localStorage.setItem("poisk_ulica", "");
				localStorage.setItem("poisk_dom", "");
				localStorage.setItem("poisk_kv", ""); */

		var poisk_ulica = jQuery(".ulica").val();
		var poisk_dom = jQuery(".dom").val();
		var poisk_kv = jQuery(".kvartira").val();

		if ((poisk_ulica !== "") && (poisk_dom !== "")) {

			localStorage.setItem("poisk_ulica", poisk_ulica);
			localStorage.setItem("poisk_dom", poisk_dom);
			localStorage.setItem("poisk_kv", poisk_kv);

			jQuery.ajax({
				url: "https://domimi.ru/uslugi_reiting_find.php",
				type: "post",
				data: {
					"cityid": cityid,
					"namecity": namecity,
					"userid": userid,
					"nameuser": nameuser,
					"reiting_id": reiting_id,
					"reiting_name": reiting_name,
					"ulica": poisk_ulica,
					"dom": poisk_dom,
					"kvartira": poisk_kv
				},
				success: function (rezul) {
					console.log(rezul);
					var obj = JSON.parse(rezul);
					if (obj.rezultstatus == 1) {
						/* location.href = "reiting_otzivi.html#otzivi"; */
						location.href = "reiting_sp_kv.html";
						jQuery(".insertotzivi").html(obj.rezultmes);
					} else {
						alert(obj.rezultmes);
					}
				}
			});
		}

	});
}



function auth() {
	jQuery(".auth_user").on("click", function () {

		var login = jQuery(".login").val();
		var pass = jQuery(".pass").val();

		jQuery.ajax({
			url: "https://domimi.ru/auth.php",
			type: "post",
			data: {
				"login": login,
				"pass": pass
			},
			success: function (rezul) {
				console.log(rezul);
				var json = JSON.parse(rezul);
				if (json.rezultstatus == 1) {
					jQuery(".dobavleniye_uslugi").html(json.rezultmes);
					localStorage.clear();

					/* 					localStorage.setItem("userid", json.id);
										localStorage.setItem("loguser", json.loguser);
										localStorage.setItem("emailuser", json.email);
										localStorage.setItem("nameuser", json.first_name);
										localStorage.setItem("famuser", json.last_name);
										localStorage.setItem("teluser", json.phone);
										localStorage.setItem("pass", json.pass);
										localStorage.setItem("user_ava", json.user_ava); */



					localStorage.setItem("userid", json.id);
					localStorage.setItem("loguser", json.loguser);
					localStorage.setItem("emailuser", json.email);
					localStorage.setItem("nameuser", json.first_name);
					localStorage.setItem("famuser", json.last_name);

					if ((json.city == null) || (json.city == "") || (json.city == undefined)) {
						localStorage.removeItem("namecity");
						localStorage.removeItem("cityid");
					} else {
						localStorage.setItem("namecity", json.city);
						localStorage.setItem("cityid", json.cityid);
					}

					if ((json.phone == null) || (json.phone == "") || (json.phone == undefined)) {
						localStorage.removeItem("teluser");
					} else {
						localStorage.setItem("teluser", json.phone);
					}

					localStorage.setItem("pass", json.pass);

					if ((json.user_ava == null) || (json.user_ava == "") || (json.user_ava == undefined)) {
						localStorage.removeItem("user_ava");
					} else {
						localStorage.setItem("user_ava", json.user_ava);
					}

					if ((json.namejk == null) || (json.namejk == "") || (json.namejk == undefined)) {
						localStorage.removeItem("namejk");
						localStorage.removeItem("jkid");
					} else {
						localStorage.setItem("namejk", json.namejk);
						localStorage.setItem("jkid", json.jkid);
					}

					if ((json.ulica == null) || (json.ulica == "") || (json.ulica == undefined)) {
						localStorage.removeItem("ulica");
					} else {
						localStorage.setItem("ulica", json.ulica);
					}

					if ((json.dom == null) || (json.dom == "") || (json.dom == undefined)) {
						localStorage.removeItem("dom");
					} else {
						localStorage.setItem("dom", json.dom);
					}

					if ((json.kv == null) || (json.kv == "") || (json.kv == undefined)) {
						localStorage.removeItem("kv");
					} else {
						localStorage.setItem("kv", json.kv);
					}



					setTimeout(location.href = "index.html", 500);
				} else {
					alert(json.rezultmes);
				}
			}
		});
	});
}


jQuery(".quick2").on("click", ".quick_registration", function (e) {
	e.preventDefault();
	console.log("Сработал клик");
	location.href = "loginpas.html";
});


function registration() {
	if (localStorage.getItem("userid") == null || localStorage.getItem("userid") == "") {
		$userid = "userid";
		jQuery.ajax({
			url: "https://domimi.ru/userloginpas.php",
			type: "post",
			data: {
				"userid": $userid
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				localStorage.setItem("userid", obj.userid);
				localStorage.setItem("loguser", obj.loguser);
				localStorage.setItem("pass", obj.pass);
				jQuery(".loginuser").text(obj.loguser);
				jQuery(".pasuser").text(obj.pass);
			}
		});
	}
}

jQuery(".reg_user").on("click", function () {
	location.href = "index.html";
});

jQuery(".exit").on("click", function (e) {
	e.preventDefault();
	localStorage.clear();
	location.href = "befor_auth.html";
});


/* Добавление статистика */
function statistics() {
	jQuery(".vibrat_usl_tel").on("click", function (e) {
		console.log("Сработал клик");
		e.preventDefault();
		namecity = localStorage.getItem("namecity");
		namejk = jQuery(this).parent().parent().parent().attr("data-jk");
		uslnamepredloj = localStorage.getItem("uslnamepredloj");


		if (namecity == "") {
			alert("Ваш город не определен");
		} else {

			jQuery.ajax({
				url: "https://domimi.ru/adminpanel/add_stat/add_stat.php",
				type: "post",
				data: {
					"namecity": namecity,
					"namejk": namejk,
					"uslnamepredloj": uslnamepredloj
				},
				success: function (rezul) {
					var obj_stat = JSON.parse(rezul);
					console.log(obj_stat.rezultmes);
					if (obj_stat.rezultstatus == 1) {
						console.log(rezul);
						/* location.reload(); */
					} else {
						console.log(rezul);
					}
				}
			});

			location.href = "tel:" + jQuery(this).data("telefon");

		}

	});
}

setTimeout(statistics, 2000);


function allinputisfilled() {
	jQuery(".poisk_line").on("input", function () {
		if ((jQuery(".poisk_line").val() !== "") && (jQuery(".poisk_line2").val() !== "")) {
			if (jQuery(".newstyleaddusl").hasClass("ahrefgrey")) {
				console.log("Сработало условие все заполнено");
				jQuery(".newstyleaddusl").removeClass("ahrefgrey");
				jQuery(".newstyleaddusl").addClass("ahrefyel");
			}
		} else {
			if (jQuery(".newstyleaddusl").hasClass("ahrefyel")) {
				console.log("Сработало условие не все заполнено");
				jQuery(".newstyleaddusl").removeClass("ahrefyel");
				jQuery(".newstyleaddusl").addClass("ahrefgrey");
			}
		}
	});

	jQuery(".poisk_line2").on("input", function () {
		if ((jQuery(".poisk_line").val() !== "") && (jQuery(".poisk_line2").val() !== "")) {
			if (jQuery(".newstyleaddusl").hasClass("ahrefgrey")) {
				console.log("Сработало условие все заполнено");
				jQuery(".newstyleaddusl").removeClass("ahrefgrey");
				jQuery(".newstyleaddusl").addClass("ahrefyel");
			}
		} else {
			if (jQuery(".newstyleaddusl").hasClass("ahrefyel")) {
				console.log("Сработало условие не все заполнено");
				jQuery(".newstyleaddusl").removeClass("ahrefyel");
				jQuery(".newstyleaddusl").addClass("ahrefgrey");
			}
		}
	});



	jQuery(".addcitytext_uldom").on("click", function () {
		if ((jQuery(".poisk_line").val() !== "") && (jQuery(".poisk_line2").val() !== "")) {
			var ulica = jQuery(".poisk_line").val();
			localStorage.setItem("ulica", ulica);

			var dom = jQuery(".poisk_line2").val();
			localStorage.setItem("dom", dom);

			/************************************************************************   Улица дом обновление для пользователя */
			var userid = localStorage.getItem("userid");
			var loginuser = localStorage.getItem("loguser");
			var pass = localStorage.getItem("pass");
			var cityid = localStorage.getItem("cityid");
			var namecity = localStorage.getItem("namecity");
			var jkid = localStorage.getItem("jkid");
			var namejk = localStorage.getItem("namejk");
			var ulica = localStorage.getItem("ulica");
			var dom = localStorage.getItem("dom");
			var user_ava = localStorage.getItem("user_ava");

			/* location */
			var latitude = localStorage.getItem("latitude");
			var longitude = localStorage.getItem("longitude");


			if ((userid !== "") && (loginuser !== "") && (pass !== "")) {
				jQuery.ajax({
					url: "https://domimi.ru/userreg/userreg.php",
					type: "post",
					data: {
						"userid": userid,
						"loginuser": loginuser,
						"pass": pass,
						"cityid": cityid,
						"namecity": namecity,
						"jkid": jkid,
						"namejk": namejk,
						"ulica": ulica,
						"dom": dom,
						"user_ava": user_ava,
						"latitude": latitude,
						"longitude": longitude
					},
					success: function (rezul) {
						var obj_reg = JSON.parse(rezul);
						console.log(obj_reg.rezultmes);
						if (obj_reg.rezultstatus == 1) {

							location.href = "index.html";

						} else {
							console.log(rezul);
						}
					}
				});
			}


		} else {
			alert("Поля обязательны для заполнения");
		}
	});
}







function location_user() {
	get_location();
}

/* Открываем правое меню */
jQuery(".svgvosmigrannik").on("click", function (e) {
	e.preventDefault();
	if (jQuery(".vidvmenuright").hasClass("displayoff")) {
		jQuery(".vidvmenuright").removeClass("displayoff");
	}
});

/* Заакрываем правое меню */
jQuery(".close").on("click", function (e) {
	e.preventDefault();
	if (!jQuery(".vidvmenuright").hasClass("displayoff")) {
		jQuery(".vidvmenuright").addClass("displayoff");
	}
});

jQuery(".pass_edit").on("click", function (e) {
	e.preventDefault();

	if (localStorage.getItem("userid") !== null || localStorage.getItem("userid") !== "") {
		$userid = localStorage.getItem("userid");
		jQuery.ajax({
			url: "https://domimi.ru/userloginpas_edit.php",
			type: "post",
			data: {
				"userid": $userid
			},
			success: function (rezul) {
				var obj_edit = JSON.parse(rezul);
				console.log(obj_edit.rezultmes);

				if (obj_edit.rezultstatus == 1) {
					localStorage.setItem("pass", obj_edit.pass);
					jQuery(".pasuser").text(obj_edit.pass);
					alert(obj_edit.rezultmes);
					/* location.href = "index.html"; */
				} else {
					console.log(rezul);
				}

			}
		});
	}
});


function profile_edit() {
	jQuery(".changeulicauser").val(localStorage.getItem("ulica"));
	jQuery(".changedomuser").val(localStorage.getItem("dom"));
	jQuery(".changekvuser").val(localStorage.getItem("kv"));

	jQuery(".username").text(localStorage.getItem("nameuser"));
	jQuery(".userfam").text(localStorage.getItem("famuser"));

	jQuery(".jkname").text(localStorage.getItem("namejk"));
	jQuery(".user_ulica").text(localStorage.getItem("ulica"));
	jQuery(".user_dom").text(localStorage.getItem("dom"));
	jQuery(".user_kv").text(localStorage.getItem("kv"));
	jQuery(".user_city").text(localStorage.getItem("namecity"));

	jQuery(".usersettings").on("click", function () {
		location.href = "loadava.html";
	});
}

function partnerprogramm() {
	jQuery(".partner3_cont1").text(localStorage.getItem("namejk"));
	jQuery(".partner3_cont2").text(localStorage.getItem("namecity"));
	jQuery(".partnerid").text(localStorage.getItem("partnerid"));

	jQuery(".part2_click").on("click", function (e) {
		e.preventDefault();

		/* var namecity = localStorage.getItem("namecity"); */
		var ulica = localStorage.getItem("ulica");
		var dom = localStorage.getItem("dom");

		if (localStorage.getItem("kv") !== null) {
			var kv = localStorage.getItem("kv");
		} else {
			var kv = "";
		}

		/* var namejk = localStorage.getItem("namejk"); */
		var userid = localStorage.getItem("userid");
		var loguser = localStorage.getItem("loguser");

		var vkmail = jQuery(".patr2_inp1").val();
		var soobshenie = jQuery(".partner2_texarea").val();
		var teluser = jQuery(".partner2_texarea").val();


		var namecity = jQuery(".us_city").val();
		var namejk = jQuery(".us_jk").val();

		if (jQuery(".us_email") !== "") {
			var pattern = /^([a-z0-9_\.-])+[@][a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			var us_email = jQuery(".us_email").val();
			if (!(pattern.test(us_email))) { valid = false; }
			else { valid = true; }
		}

		if ((vkmail !== "") && (soobshenie !== "") && (teluser !== "") && (namecity !== "") && (namejk !== "") && (valid)) {
			jQuery.ajax({
				url: "https://domimi.ru/partner_zayavka.php",
				type: "post",
				data: {
					"userid": userid,
					"namecity": namecity,
					"ulica": ulica,
					"dom": dom,
					"kv": kv,
					"namejk": namejk,
					"loguser": loguser,
					"vkmail": vkmail,
					"soobshenie": soobshenie,
					"teluser": teluser,
					"us_email": us_email
				},
				success: function (rezul) {
					var zayavka = JSON.parse(rezul);
					console.log(zayavka.rezultmes);

					if (zayavka.rezultstatus == 1) {
						alert(zayavka.rezultmes);
						localStorage.setItem("partnerid", zayavka.partnerid);
						console.log(zayavka.partnerid);
						location.href = "partner3.html";
					} else {
						console.log(rezul);
					}

				}
			});
		} else {
			alert("Проверьте введенные данные, верно ли введена почта?");
		}

	});

}



/* Убираем дубли в рейтинге о квартирах */
function dubldel() {

	main = jQuery(".kv_click").length;
	var arr = []; /* Массив со всеми значениями с повторениями */

	jQuery(".kv_click").each(function (i, elem) {
		nomer_kv = jQuery(this).children().children(".kv_line").children(".kv_ins").text();
		nomer_kv = Number(nomer_kv);
		console.log("цикл = " + i + " " + nomer_kv);
		arr.push(nomer_kv);
	});
	console.log("ИСХОДНЫЙ МАССИВ = " + arr);

	uniqueArray = arr.filter(function (item, pos) {
		return arr.indexOf(item) == pos;
	});
	console.log("Массив без повторений", uniqueArray);



	var n = uniqueArray.length;

	for (var i2 = 0; i2 < n + 1; i2++) {
		var count = 0;
		console.log("Массив цикловый 1 = " + arr);
		console.log("Обработка по i2 = " + i2);
		console.log("ОБРАБОТКА ПО ЗНАЧЕНИЮ УНИК = " + uniqueArray[i2]);

		var n2 = arr.length;
		for (var i3 = 0; i3 < n2; i3++) {
			console.log("Запуск цикл 2");
			/* if (Number(arr[i2]) == Number(arr[i3])) { */
			if (parseInt(uniqueArray[i2]) == parseInt(arr[i3])) {
				console.log("arr[i2] = " + uniqueArray[i2] + " = arr[i3] = " + arr[i3]);
				count = count + 1;
				console.log("count = " + count);
			}
			/* if ((count > 1) && (Number(arr[i2]) == Number(arr[i3]))) { */
			if ((count > 1) && (parseInt(uniqueArray[i2]) == parseInt(arr[i3]))) {
				console.log("цикл 2");
				console.log("arr = " + arr);
				console.log("eq 3 = " + i3);
				jQuery(".kv_click").eq(i3).addClass("displayoff");
				/* break; */
			}

		}
	}
}


/* Список квартир в номинации */
function reiting_sp_kv() {

	var cityid = localStorage.getItem("cityid");
	var namecity = localStorage.getItem("namecity");
	var userid = localStorage.getItem("userid");
	var nameuser = localStorage.getItem("nameuser");

	var reiting_id = localStorage.getItem("reiting_id");
	var reiting_name = localStorage.getItem("reiting_name");

	var namecity = localStorage.getItem("namecity");
	var userid = localStorage.getItem("userid");
	var nameuser = localStorage.getItem("nameuser");


	var poisk_ulica = localStorage.getItem("poisk_ulica");
	var poisk_dom = localStorage.getItem("poisk_dom");
	var poisk_kv = localStorage.getItem("poisk_kv");

	if ((poisk_ulica !== "") && (poisk_dom !== "") && (poisk_kv !== "")) {
		jQuery.ajax({
			url: "https://domimi.ru/uslugi_reiting_find_sp_kv.php",
			type: "post",
			data: {
				"cityid": cityid,
				"namecity": namecity,
				"userid": userid,
				"nameuser": nameuser,
				"reiting_id": reiting_id,
				"reiting_name": reiting_name,
				"ulica": poisk_ulica,
				"dom": poisk_dom,
				"kvartira": poisk_kv
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					/* location.href = "reiting_sp_kv.html"; */
					jQuery(".sp_kv_insert").html(obj.rezultmes);
					if (obj.nouslug !== "game") {
						jQuery(".sp_kv_insert").html(obj.nouslug);
					}
					/* Удаляем дубли */
					dubldel();
				} else {
					alert(obj.rezultmes);
				}
			}
		});
	}





	jQuery(".sp_kv_insert").on("click", ".kv_click", function () {
		var see_kv = jQuery(this).attr("data-kv");
		localStorage.setItem("see_kv", see_kv);
		location.href = "reiting_kv.html";
	});

}

function kv_naimenovanie() {
	jQuery(".kv_naimenovanie").text(localStorage.getItem("see_kv") + "кв.");

	jQuery(".star1").on("click", function () {
		jQuery(".star1").attr("src", "img/star_no_zero.svg");

		jQuery(".star2").attr("src", "img/star_zero.svg");
		jQuery(".star3").attr("src", "img/star_zero.svg");
		jQuery(".star4").attr("src", "img/star_zero.svg");
		jQuery(".star5").attr("src", "img/star_zero.svg");
	});

	jQuery(".star2").on("click", function () {
		jQuery(".star1").attr("src", "img/star_no_zero.svg");
		jQuery(".star2").attr("src", "img/star_no_zero.svg");

		jQuery(".star3").attr("src", "img/star_zero.svg");
		jQuery(".star4").attr("src", "img/star_zero.svg");
		jQuery(".star5").attr("src", "img/star_zero.svg");
	});

	jQuery(".star3").on("click", function () {
		jQuery(".star1").attr("src", "img/star_no_zero.svg");
		jQuery(".star2").attr("src", "img/star_no_zero.svg");
		jQuery(".star3").attr("src", "img/star_no_zero.svg");

		jQuery(".star4").attr("src", "img/star_zero.svg");
		jQuery(".star5").attr("src", "img/star_zero.svg");
	});

	jQuery(".star4").on("click", function () {
		jQuery(".star1").attr("src", "img/star_no_zero.svg");
		jQuery(".star2").attr("src", "img/star_no_zero.svg");
		jQuery(".star3").attr("src", "img/star_no_zero.svg");
		jQuery(".star4").attr("src", "img/star_no_zero.svg");

		jQuery(".star5").attr("src", "img/star_zero.svg");
	});

	jQuery(".star5").on("click", function () {
		jQuery(".star1").attr("src", "img/star_no_zero.svg");
		jQuery(".star2").attr("src", "img/star_no_zero.svg");
		jQuery(".star3").attr("src", "img/star_no_zero.svg");
		jQuery(".star4").attr("src", "img/star_no_zero.svg");
		jQuery(".star5").attr("src", "img/star_no_zero.svg");
	});


	var user_ava = localStorage.getItem("user_ava");
	var cityid = localStorage.getItem("cityid");
	var namecity = localStorage.getItem("namecity");
	var userid = localStorage.getItem("userid");
	var nameuser = localStorage.getItem("nameuser");

	var reiting_id = localStorage.getItem("reiting_id");
	var reiting_name = localStorage.getItem("reiting_name");

	var poisk_ulica = localStorage.getItem("poisk_ulica");
	var poisk_dom = localStorage.getItem("poisk_dom");
	var poisk_kv = localStorage.getItem("poisk_kv");

	if ((poisk_ulica !== "") && (poisk_dom !== "")) {


		jQuery.ajax({
			url: "https://domimi.ru/kv_reiting_find.php",
			type: "post",
			data: {
				"cityid": cityid,
				"namecity": namecity,
				"userid": userid,
				"nameuser": nameuser,
				"reiting_id": reiting_id,
				"reiting_name": reiting_name,
				"ulica": poisk_ulica,
				"dom": poisk_dom,
				"kvartira": poisk_kv
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					/* location.href = "reiting_otzivi.html#otzivi"; */
					/* location.href = "reiting_sp_kv.html"; */
					jQuery(".insertkvotzivi").html(obj.rezultmes);
				} else {
					alert(obj.rezultmes);
				}
			}
		});
	}





	jQuery(".circle_poisk2").on("click", function () {

		if (jQuery(".poisk_line2").val() !== "") {

			var reitingotziv = jQuery(".poisk_line2").val();

			jQuery.ajax({
				url: "https://domimi.ru/uslugi_reiting_otziv.php",
				type: "post",
				data: {
					"cityid": cityid,
					"namecity": namecity,
					"userid": userid,
					"nameuser": nameuser,
					"reiting_id": reiting_id,
					"reiting_name": reiting_name,
					"ulica": poisk_ulica,
					"dom": poisk_dom,
					"kvartira": poisk_kv,
					"reitingotziv": reitingotziv,
					"user_ava": user_ava
				},
				success: function (rezul) {
					console.log(rezul);
					var obj3 = JSON.parse(rezul);
					if (obj3.rezultstatus == 1) {
						alert(obj3.rezultmes);
						location.reload();
					} else {
						alert(obj3.rezultmes);
					}
				}
			});
		} else {
			alert("Отзыв не может быть пустым");
		}


	});




}




















/************************************************************************************************************************************** */
/* Социалка авторизация */

/* Получаем в функциию токен и отправляем снова*/
/* Получаем при авторизации через соц сети основную инфу и пароль */


var token2 = "";
var token = "";

function domimisoc(newtoken) {
	localStorage.clear();
	console.log("domimisoc запущен");
	console.log("token = " + newtoken);

	jQuery.ajax({
		url: "https://domimi.ru/ajax2/ajax.php",
		type: "post",
		data: {
			"token2": newtoken
		},
		success: function (res) {
			/* alert(newtoken); */

			var json = JSON.parse(res);

			/* 						localStorage.setItem("email", json.email);
									localStorage.setItem("first_name", json.first_name);
									localStorage.setItem("identity", json.identity);
									localStorage.setItem("last_name", json.last_name);
									localStorage.setItem("network", json.network);
									localStorage.setItem("user_ava", json.photo);
									localStorage.setItem("uid", json.uid);
									localStorage.setItem("verified_email", json.verified_email);
									localStorage.setItem("phone", json.phone);
									localStorage.setItem("pass", json.pass);
									localStorage.setItem("balans", json.balans);
									localStorage.setItem("id", json.id); */


			/* 			"id" => $all3[0]['id'],
							"loguser" => $all3[0]['loguser'],
								"email" => $all3[0]['email'],
									"first_name" => $all3[0]['first_name'],
										"last_name" => $all3[0]['last_name'],
											"city" => $all3[0]['city'],
												"phone" => $all3[0]['phone'],
													"pass" => $all3[0]['pass'],
														"user_ava" => $all3[0]['user_ava'],
															"namejk" => $all3[0]['namejk'],
																"ulica" => $all3[0]['ulica'],
																	"dom" => $all3[0]['dom'],
																		"kv" => $all3[0]['kv'],
																			"uid" => $all3[0]['uid'],
																				"network" => $network */




			localStorage.setItem("userid", json.id);
			localStorage.setItem("loguser", json.loguser);
			localStorage.setItem("emailuser", json.email);
			localStorage.setItem("nameuser", json.first_name);
			localStorage.setItem("famuser", json.last_name);

			if ((json.city == null) || (json.city == "") || (json.city == undefined)) {
				localStorage.removeItem("namecity");
				localStorage.removeItem("cityid");
			} else {
				localStorage.setItem("namecity", json.city);
				localStorage.setItem("cityid", json.cityid);
			}

			if ((json.phone == null) || (json.phone == "") || (json.phone == undefined)) {
				localStorage.removeItem("teluser");
			} else {
				localStorage.setItem("teluser", json.phone);
			}

			localStorage.setItem("pass", json.pass);

			if ((json.user_ava == null) || (json.user_ava == "") || (json.user_ava == undefined)) {
				localStorage.removeItem("user_ava");
			} else {
				localStorage.setItem("user_ava", json.user_ava);
			}

			if ((json.namejk == null) || (json.namejk == "") || (json.namejk == undefined)) {
				localStorage.removeItem("namejk");
				localStorage.removeItem("jkid");
			} else {
				localStorage.setItem("namejk", json.namejk);
				localStorage.setItem("jkid", json.jkid);
			}

			if ((json.ulica == null) || (json.ulica == "") || (json.ulica == undefined)) {
				localStorage.removeItem("ulica");
			} else {
				localStorage.setItem("ulica", json.ulica);
			}

			if ((json.dom == null) || (json.dom == "") || (json.dom == undefined)) {
				localStorage.removeItem("dom");
			} else {
				localStorage.setItem("dom", json.dom);
			}

			if ((json.kv == null) || (json.kv == "") || (json.kv == undefined)) {
				localStorage.removeItem("kv");
			} else {
				localStorage.setItem("kv", json.kv);
			}




			location.href = "index.html";
			/* jQuery(".quick_registration").click(); */
		}
	});
}

/* Проверка callback */
function helloworld() {
	alert("Hello world");
}

/* Передача с приложения запроса на юлогин старт */
var Sauth = {
	page: false,
	params: {},

	dialog: function (network) {
		/* Sauth.page = window.open('https://ulogin.ru/auth.php?name=' + network + '&window=0&fields=email,first_name,last_name,photo,uid,phone,verified_email&url=&altway=1&callback=http://domimi.ru', '_blank', 'location=no'); */

		/* Sauth.page = window.open('https://ulogin.ru/auth.php?name=' + network + '&window=0&fields=email,first_name,last_name,photo,uid,phone,verified_email&url=&altway=1&ulogin_callback=http://domimi.ru', '_blank', 'location=no'); */

		/* 		Sauth.page = window.open('https://ulogin.ru/auth.php?name=' + network + '&window=0&fields=email,first_name,last_name,photo,uid,phone,verified_email&url=&altway=1&host=http://domimi.ru', '_blank', 'location=no'); */

		Sauth.page = window.open('https://ulogin.ru/auth.php?name=' + network + '&window=0&fields=email,first_name,last_name,photo,phone&url=&altway=1&callback=http://domimi.ru', '_blank', 'location=no');

		/* Sauth.page.addEventListener('loadstop', function (event) { */
		Sauth.page.addEventListener('loadstart', function (event) {

			if (event.url.indexOf('ulogin_token=') !== -1) {
				var result = event.url.split('?')[1].split('&');

				for (var i = 0; i < result.length; i++) {
					var tmp = result[i].split('=');
					Sauth.params[tmp[0]] = tmp[1];
				}

				console.log(Sauth.params['ulogin_token']);



				token2 = Sauth.params['ulogin_token'];
				domimisoc(token2);

				if (Sauth.params['ulogin_token']) {
					/* token2 = Sauth.params['ulogin_token']; */

					//Sauth.checkExistingUser(Sauth.params['token']);
					Sauth.page.close();
					/* domimisoc(token2); */
				}
			}
			else if (event.url.indexOf('error=') !== -1) {
				Sauth.page.close();
			}
		});
	},
};
/* Передача с приложения запроса на юлогин финиш */





/*********************************************************************************************************************** */















































function uslugi_reiting_find() {
	var user_ava = localStorage.getItem("user_ava");
	var cityid = localStorage.getItem("cityid");
	var namecity = localStorage.getItem("namecity");
	var userid = localStorage.getItem("userid");
	var nameuser = localStorage.getItem("nameuser");

	var reiting_id = localStorage.getItem("reiting_id");
	var reiting_name = localStorage.getItem("reiting_name");

	var string_reiting = "Номинация \"" + reiting_name + "\"";
	jQuery(".reiting_otziv").text(string_reiting);


	jQuery("body").on("click", ".ostavit_otziv", function () {
		var reitingotziv = jQuery(".reitingotziv").val();

		var ulica = jQuery(".ulica").val();
		var dom = jQuery(".dom").val();
		var kvartira = jQuery(".kvartira").val();

		if ((cityid !== "") && (namecity !== "") && (ulica !== "") && (dom !== "") && (kvartira !== "") && (reitingotziv !== "") && (userid !== "") && (nameuser !== "")) {

			localStorage.setItem("poisk_ulica", ulica);
			localStorage.setItem("poisk_dom", dom);
			localStorage.setItem("poisk_kv", kvartira);

			console.log("cityid = " + cityid);
			console.log("namecity = " + namecity);
			console.log("userid = " + userid);
			console.log("nameuser = " + nameuser);
			console.log("reiting_id = " + reiting_id);
			console.log("reiting_name = " + reiting_name);
			console.log("reitingotziv = " + reitingotziv);
			console.log("ulica = " + ulica);
			console.log("dom = " + dom);
			console.log("kvartira = " + kvartira);


			jQuery.ajax({
				url: "https://domimi.ru/uslugi_reiting_otziv.php",
				type: "post",
				data: {
					"cityid": cityid,
					"namecity": namecity,
					"userid": userid,
					"nameuser": nameuser,
					"reiting_id": reiting_id,
					"reiting_name": reiting_name,
					"ulica": ulica,
					"dom": dom,
					"kvartira": kvartira,
					"reitingotziv": reitingotziv,
					"user_ava": user_ava
				},
				success: function (rezul) {
					console.log(rezul);
					var obj = JSON.parse(rezul);
					if (obj.rezultstatus == 1) {
						alert(obj.rezultmes);
						location.href = "reiting_otzivi.html";
					} else {
						alert(obj.rezultmes);
					}
				}
			});
		} else {
			alert("Проверьте все ли вы данные заполнили в форме, а также проверьте заполнены ли данные в настройках");
		}
	});

}



/* Перезагрузить если была смена ориентации экрана мобильного устройства */
window.addEventListener("orientationchange", function () {
	this.location.reload();
});

/* Меняем бекграунд на Желтный */
function jelback() {
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		if (jQuery(".firstheaderstyle").hasClass("yelback")) {
			if (cordova.platformId == 'android') {
				StatusBar.show();
				StatusBar.backgroundColorByHexString("#FFD600");
			}
		} else {
			if (cordova.platformId == 'android') {
				StatusBar.show();
				StatusBar.backgroundColorByHexString("#4285F4");
			}
		}

		if (jQuery(".firstheaderstyle").hasClass("yelback")) {
			if (cordova.platformId == 'ios') {
				StatusBar.show();
				StatusBar.backgroundColorByHexString("#FFD600");
			}
		} else {
			if (cordova.platformId == 'ios') {
				StatusBar.show();
				StatusBar.backgroundColorByHexString("#4285F4");
			}
		}




		/* Яндекс аналитика */
		var configuration = {
			// Mandatory
			apiKey: '6e06456e-cd38-481a-82b2-0ce50a4dd349',
			// Optional
			locationTracking: true,
			handleFirstActivationAsUpdate: true,
			sessionTimeout: 15
		}
		window.appMetrica.activate(configuration);
		window.appMetrica.reportEvent('Test event', { 'foo': 'bar' });




	}
}
jelback();


/* Перейти в настройки если нет имени */
function ifnoname() {
	if (localStorage.getItem("nameuser") == null) {
		alert("Введите имя в профиле");
		location.href = "changedetails.html";
	}
}


/************************************************************************************************** */

/* Вывод пользовательских объявлений 2*/
function myadvert2() {
	var userid = localStorage.getItem("userid");

	if ((userid !== "") && (userid !== null)) {
		jQuery.ajax({
			url: "https://domimi.ru/myadvert2.php",
			type: "post",
			data: {
				"userid": userid
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					jQuery(".inset_uslugi_jk_find").html(obj.rezultmes);
					rsblocks();
					del_myadvert();
				} else {
					alert(obj.rezultmes);
				}

			}
		});
	} else {
		alert("Проверьте все ли вы данные заполнили в настройках")
	}
}

/* Вывод пользовательских объявлений 2*/
function myadvert_ichu2() {
	var userid = localStorage.getItem("userid");

	if ((userid !== "") && (userid !== null)) {
		jQuery.ajax({
			url: "https://domimi.ru/myadvert_ichu2.php",
			type: "post",
			data: {
				"userid": userid
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					jQuery(".inset_uslugi_jk_find").html(obj.rezultmes);
					rsblocks();
					del_myadvert_ichu();
				} else {
					alert(obj.rezultmes);
				}

			}
		});
	} else {
		alert("Проверьте все ли вы данные заполнили в настройках");
	}
}

/****************************************************************************************************** */


jQuery(".advert2_click2").on("click", ".objavl2", function () {
	tel = jQuery(this).data("teluser");
	location.href = "tel:" + tel;
});





/************************************************************************************************** */
/* Еще new */


jQuery(".advert2_click2").on("click", ".objavl3", function () {
	var uslidpredloj = jQuery(this).children(".uslfoto").attr("data-id");
	var uslnamepredloj = jQuery(this).children(".cont_advert2").children(".name_advert2").text();
	localStorage.setItem("uslidpredloj", uslidpredloj);
	localStorage.setItem("uslnamepredloj", uslnamepredloj);   								/* Услуга по которой производится поиск. Предложение */
	location.href = "spisokpredloj.html";
});

jQuery(".ichu_advert2_click2").on("click", ".objavl3", function () {
	/* 	var uslidpoisk = jQuery(this).attr("data-id");
		localStorage.setItem("uslidpoisk", uslidpoisk);  	 */							/* Услуга по которой производится поиск. Поиск услуги */

	var uslidpredloj = jQuery(this).children(".uslfoto").attr("data-id");
	var uslnamepredloj = jQuery(this).children(".cont_advert2").children(".name_advert2").text();
	localStorage.setItem("uslidpredloj", uslidpredloj);
	localStorage.setItem("uslnamepredloj", uslnamepredloj);
	location.href = "spisokichu.html";
});

/* Сортировака */
function sorteche() {
	var arr = [];
	jQuery(".objavl3").each(function (i, elem) {
		htmlcode = jQuery(this).html();
		htmlcode = '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 objavl3">' + htmlcode + '</div>';
		var c = arr.push(htmlcode);
		console.log(htmlcode);
	});

	var arr2 = [];
	jQuery(".uslfoto").each(function (i2, elem) {
		htmlcode = jQuery(this).attr("sortnomer");
		var sortnomer = Math.floor(htmlcode);
		var c2 = arr2.push(sortnomer);
		console.log(c2);
	});

	var n = arr2.length;
	for (var i = 0; i < n - 1; i++) {
		for (var j = 0; j < n - 1 - i; j++) {
			if (arr2[j + 1] < arr2[j]) {
				var t = arr2[j + 1];
				arr2[j + 1] = arr2[j];
				arr2[j] = t;
				var tmain = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = tmain;
			}
		}
	}
	console.log(arr);
	jQuery(".advert2_click2").html(arr);
	jQuery(".ichu_advert2_click2").html(arr);
}




/* Вывод пользовательских объявлений по пунктам еще*/
function eche_predl() {
	var userid = localStorage.getItem("userid");

	if ((userid !== "") && (userid !== null)) {
		jQuery.ajax({
			url: "https://domimi.ru/eche_predl.php",
			type: "post",
			data: {
				"userid": userid
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					jQuery(".inset_uslugi_jk_find").html(obj.rezultmes);
					rsblocks();
					/* del_myadvert(); */
				} else {
					alert(obj.rezultmes);
				}

			}
		});
	} else {
		alert("Проверьте все ли вы данные заполнили в настройках")
	}
	setTimeout(sorteche, 1000);
}

/* Вывод пользовательских объявлений 2*/
function eche_ichu() {
	var userid = localStorage.getItem("userid");

	if ((userid !== "") && (userid !== null)) {
		jQuery.ajax({
			url: "https://domimi.ru/eche_ichu.php",
			type: "post",
			data: {
				"userid": userid
			},
			success: function (rezul) {
				console.log(rezul);
				var obj = JSON.parse(rezul);
				if (obj.rezultstatus == 1) {
					jQuery(".inset_uslugi_jk_find").html(obj.rezultmes);
					rsblocks();
					/* del_myadvert_ichu(); */
				} else {
					alert(obj.rezultmes);
				}

			}
		});
	} else {
		alert("Проверьте все ли вы данные заполнили в настройках");
	}
	setTimeout(sorteche, 1000);
}

/****************************************************************************************************** */



function reitingforewer() {
	jQuery(".ulica").val(localStorage.getItem("ulica"));
	jQuery(".dom").val(localStorage.getItem("dom"));
}

/* Правка банера партнерки на главной */
function insertw90() {
	curentw = jQuery("body").width();
	if (curentw < 411) {
		jQuery(".insertw90").addClass("w90");
	}
}


/* Поиск услуги */
function poiskusl() {
	console.log("Запуск");
	html = jQuery(".advert2_click2").html();
	jQuery(".poiskusl").change(function () {
		jQuery(".advert2_click2").html(html);
		var str = jQuery(".poiskusl").val();
		/* alert("jr"); */
		console.log(str);
		jQuery(".objavl3").each(function (i, elem) {
			uslname = jQuery(this).children(".cont_advert2").children(".name_advert2").text();
			console.log("цикл = " + i + " " + uslname);
			if (uslname.indexOf(str) !== -1) {
				console.log(uslname);
			} else {
				console.log("-1");
				jQuery(this).remove();
			}
		});
	});
}


/* Меняем стиль если в услуге  больше 30 символов */
function textnormalize() {
	str = jQuery(".dobavleniye_uslugi").text().length;
	width = jQuery("body").width();
	if ((str > 25) && (width < 600)) {
		jQuery(".dobavleniye_uslugi").css("font-size", "12px");
		console.log("Смена Font-size");
	}
}
setTimeout(textnormalize, 1500);


/* Выравниваем блок авторизации по центру */
function centered_block_auth() {
	body_h = jQuery("body").height();
	fon_ugol_h = jQuery(".fon_ugol").height();
	centered_block_auth_h = jQuery(".centered_block_auth").height();
	marg_centered_block_auth = (body_h - fon_ugol_h - centered_block_auth_h) / 2;
	if (marg_centered_block_auth > 0) {
		jQuery(".centered_block_auth").css("margin-top", marg_centered_block_auth);
	} else {
		marg_centered_block_auth = 0;
	}

}
centered_block_auth();

function scroll_on() {
	console.log("scrool_on active");
	w = jQuery(".scroll_on").width();
	jQuery(".wscr").css("width", w);
	jQuery(".scrool").css("width", w);
}

/* Поиск Города */
function poiskcity1() {
	console.log("Запуск");
	html = jQuery(".poskcitystart").html();
	/* jQuery(".poiskcity").change(function () { */
	jQuery(".poiskcity").on("input", function () {
		jQuery(".poskcitystart").html(html);
		var str = jQuery(".poiskcity").val();
		/* alert("jr"); */
		console.log(str);
		jQuery(".namecityselect").each(function (i, elem) {
			namecity = jQuery(this).text();
			console.log("цикл = " + i + " " + namecity);
			if (namecity.indexOf(str) !== -1) {
				console.log(namecity);
			} else {
				console.log("-1");
				jQuery(this).parent().parent().remove();
			}
		});
	});
}


/* Поиск Города2 */
function poiskcity2() {
	console.log("Запуск");
	html = jQuery(".poskcitystart").html();
	/* jQuery(".poiskcity").change(function () { */
	jQuery(".poiskcity").on("input", function () {
		jQuery(".poskcitystart").html(html);
		var str = jQuery(".poiskcity").val();
		/* alert("jr"); */
		console.log(str);
		jQuery(".namecityselect").each(function (i, elem) {
			namecity = jQuery(this).text();
			console.log("цикл = " + i + " " + namecity);
			if (namecity.indexOf(str) !== -1) {
				console.log(namecity);
			} else {
				console.log("-1");
				jQuery(this).parent().parent().remove();
			}
		});
	});
}


/* Поиск ЖК */
function poiskjk1() {
	console.log("Запуск");
	html = jQuery(".poskjkstart").html();
	/* jQuery(".poiskjk").change(function () { */
	jQuery(".poiskjk").on("input", function () {
		jQuery(".poskjkstart").html(html);
		var str = jQuery(".poiskjk").val();
		/* alert("jr"); */
		console.log(str);
		jQuery(".namejkselect").each(function (i, elem) {
			namejk = jQuery(this).text();
			console.log("цикл = " + i + " " + namejk);
			if (namejk.indexOf(str) !== -1) {
				console.log(namejk);
			} else {
				console.log("-1");
				jQuery(this).parent().parent().remove();
			}
		});
	});
}

/* Вывод текста в отзывах о квартирах */
function soprovtext() {
	str = "Номинация: <strong>" + localStorage.getItem("reiting_name") + "</strong> ЖК: <strong>" + localStorage.getItem("namejk") + "</strong>, <strong>" + localStorage.getItem("namecity") + "</strong>, <strong>ул." + localStorage.getItem("ulica") + "</strong>, <strong>дом " + localStorage.getItem("dom") + '</strong><a href="changedetails.html" class="redactirovat">ред</a>';
	jQuery(".soprovtext").html(str);
}


/* Поиск квартиры */
function poisk_kv() {
	console.log("Запуск");
	html = jQuery(".sp_kv_insert").html();
	jQuery(".poisk_kv").change(function () {
		jQuery(".sp_kv_insert").html(html);
		var str = jQuery(".poisk_kv").val();
		/* alert("jr"); */
		console.log(str);
		jQuery(".kv_click").each(function (i, elem) {
			nomer_kv = jQuery(this).children().children(".kv_line").children(".kv_ins").text();
			console.log("цикл = " + i + " " + nomer_kv);
			if (nomer_kv.indexOf(str) !== -1) {
				console.log(nomer_kv);
			} else {
				console.log("-1");
				jQuery(this).remove();
			}
		});
	});
}






function reiting_otziv_callback() {
	var user_ava = localStorage.getItem("user_ava");
	var cityid = localStorage.getItem("cityid");
	var namecity = localStorage.getItem("namecity");
	var userid = localStorage.getItem("userid");
	var nameuser = localStorage.getItem("nameuser");

	var reiting_id = localStorage.getItem("reiting_id");
	var reiting_name = localStorage.getItem("reiting_name");


	jQuery("body").on("click", ".ostavit_otziv", function () {
		console.log("Сработал клик функции добавления рейтинга по квартире");
		var reitingotziv = jQuery(".reitingotziv").val();

		var ulica = localStorage.getItem("ulica");
		var dom = localStorage.getItem("dom");
		/* var kvartira = localStorage.getItem("kv"); */
		var kvartira = jQuery(".kvartira").val();

		if ((cityid !== "") && (namecity !== "") && (ulica !== "") && (dom !== "") && (kvartira !== "") && (reitingotziv !== "") && (userid !== "") && (nameuser !== "") && (nameuser !== null) && (kvartira !== null)) {

			localStorage.setItem("poisk_ulica", ulica);
			localStorage.setItem("poisk_dom", dom);
			localStorage.setItem("poisk_kv", kvartira);

			console.log("cityid = " + cityid);
			console.log("namecity = " + namecity);
			console.log("userid = " + userid);
			console.log("nameuser = " + nameuser);
			console.log("reiting_id = " + reiting_id);
			console.log("reiting_name = " + reiting_name);
			console.log("reitingotziv = " + reitingotziv);
			console.log("ulica = " + ulica);
			console.log("dom = " + dom);
			console.log("kvartira = " + kvartira);


			jQuery.ajax({
				url: "https://domimi.ru/uslugi_reiting_otziv.php",
				type: "post",
				data: {
					"cityid": cityid,
					"namecity": namecity,
					"userid": userid,
					"nameuser": nameuser,
					"reiting_id": reiting_id,
					"reiting_name": reiting_name,
					"ulica": ulica,
					"dom": dom,
					"kvartira": kvartira,
					"reitingotziv": reitingotziv,
					"user_ava": user_ava
				},
				success: function (rezul) {
					console.log(rezul);
					var obj = JSON.parse(rezul);
					if (obj.rezultstatus == 1) {
						alert(obj.rezultmes);
						location.href = "reiting_sp_kv.html";
					} else {
						alert(obj.rezultmes);
					}
				}
			});
		} else {
			alert("Проверьте в профиле заполненно ли у вас Имя и квартира");
			location.href = "changedetails.html";
		}
	});

}

function sekectjk_name() {
	jQuery(".namejkselect").on("click", function () {
		jQuery(this).parent("td").parent("tr").children("td").children(".circlejk").click();
	});
}

function selectcity_name() {
	jQuery(".namecityselect").on("click", function () {
		jQuery(this).parent("td").parent("tr").children("td").eq(1).children(".circle").click();
	});
}


/* Юзер добавить город  */
jQuery(".useraddcitybd").on("click", function (e) {
	e.preventDefault();
	var useraddcity = jQuery(".useraddcity").val();
	if (confirm('Ваш город "' + useraddcity + '"?')) {
		localStorage.setItem("namecity", useraddcity);

		if (useraddcity !== "undefined") {
			jQuery.ajax({
				url: "https://domimi.ru/adminpanel/add_city/add_city.php",
				type: "post",
				data: {
					"namecityadd": useraddcity
				},
				success: function (rezul) {
					var obj = JSON.parse(rezul);
					if (obj.rezultstatus == 1) {
						alert(obj.rezultmes);
						location.href = "jkchoose.html";
					} else {
						alert(obj.rezultmes);
					}
				}
			});

		}
	} else {
		/* localStorage.setItem("namecity", "Не выбран город"); */
	}
});





/* --------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------
				new code to add
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------
---------------------------------------------------------- */

function cityonresp(thissearch) {
	html = "";
	geocode = thissearch;
	jQuery.ajax({
		url: "https://geocode-maps.yandex.ru/1.x/",
		type: "get",
		data: {
			"apikey": "8fa1f586-0f65-49a6-a6d2-23e4fe7a2f08",
			"format": "json",
			"lang": "ru_RU",
			/* "geocode": "Россия Москва */
			"geocode": geocode
		},
		success: function (rezul) {
			obj = rezul;
			console.log(rezul);
			/* jQuery(".jsonresponse").html(rezul); */
			console.log("<br /> ------------------------------------------------<br /> Первый " + obj.response.GeoObjectCollection.featureMember);

			arr = obj.response.GeoObjectCollection.featureMember;
			var n = arr.length;
			console.log("Массив состоит из " + n + " Элементов");
			for (var i = 0; i <= n - 1; i++) {
				console.log(arr[i]);
				console.log("<br /> номер i = " + i);
				console.log("<br /> Город = " + arr[i].GeoObject.name);

				html = html + '<div class="thisnameresp">' + arr[i].GeoObject.name + '</div>';
			}
			jQuery(".jsonresponse").html(html);
		}
	});
}
/* cityonresp(); */

/* Для перезапуска функции cityonresp */
function searchlinejson() {
	jQuery(".searchlinejson").on("input", function () {
		searchlinejson = jQuery(".searchlinejson").val();
		cityonresp(searchlinejson);
	});
}
/* searchlinejson(); */

/* Действие по выбору ответа */
function clickresponsecity() {
	jQuery(".jsonresponse").on("click", ".thisnameresp", function () {
		content = jQuery(this).text();
		jQuery(".searchlinejson").val(content);
		jQuery(".jsonresponse").html("");
	});
}
/* clickresponsecity(); */






/* Получение подсказок ЖК*/
function jkjson(thissearch) {
	html = "";
	city = localStorage.getItem("namecity");
	geocode = thissearch;
	jQuery.ajax({
		url: "https://geocode-maps.yandex.ru/1.x/",
		type: "get",
		data: {
			"apikey": "8fa1f586-0f65-49a6-a6d2-23e4fe7a2f08",
			"format": "json",
			/* "geocode": "Россия Москва ЖК" */
			"geocode": city + ' ' + geocode
		},
		success: function (rezul) {
			obj = rezul;
			console.log(rezul);
			/* jQuery(".jsonresponse").html(rezul); */
			console.log("<br /> ------------------------------------------------<br /> Первый " + obj.response.GeoObjectCollection.featureMember);

			arr = obj.response.GeoObjectCollection.featureMember;
			var n = arr.length;
			console.log("Массив состоит из " + n + " Элементов");
			for (var i = 0; i <= n - 1; i++) {
				console.log(arr[i]);
				console.log("<br /> номер i = " + i);
				console.log("<br /> текущий ЖК = " + arr[i].GeoObject.name);

				html = html + '<div class="thisnameresp">' + arr[i].GeoObject.name + '</div>';
			}
			jQuery(".jsonresponse").html(html);
		}
	});
}
/* jkjson(); */
/* Для перезапуска функции cityonresp */
function searchlinejsonjk() {
	jQuery(".searchlinejson").on("input", function () {
		searchlinejson = jQuery(".searchlinejson").val();
		jkjson(searchlinejson);
	});
}
/* searchlinejson(); */

/* Действие по выбору ответа */
function clickresponsejk() {
	jQuery(".jsonresponse").on("click", ".thisnameresp", function () {
		content = jQuery(this).text();
		jQuery(".searchlinejson").val(content);
		jQuery(".jsonresponse").html("");
	});
}
/* clickresponsejk(); */










/* Получение подсказок Улицы*/
function ulicajson(thissearch) {
	html = "";
	city = localStorage.getItem("namecity");
	geocode = thissearch;
	jQuery.ajax({
		url: "https://geocode-maps.yandex.ru/1.x/",
		type: "get",
		data: {
			"apikey": "8fa1f586-0f65-49a6-a6d2-23e4fe7a2f08",
			"format": "json",
			/* "geocode": "Россия Москва ЖК" */
			"geocode": city + ' ' + geocode
		},
		success: function (rezul) {
			obj = rezul;
			console.log(rezul);
			/* jQuery(".jsonresponse").html(rezul); */
			console.log("<br /> ------------------------------------------------<br /> Первый " + obj.response.GeoObjectCollection.featureMember);

			arr = obj.response.GeoObjectCollection.featureMember;
			var n = arr.length;
			console.log("Массив состоит из " + n + " Элементов");
			for (var i = 0; i <= n - 1; i++) {
				console.log(arr[i]);
				console.log("<br /> номер i = " + i);
				console.log("<br /> текущий Улица = " + arr[i].GeoObject.name);

				html = html + '<div class="thisnameresp">' + arr[i].GeoObject.name + '</div>';
			}
			jQuery(".jsonresponse").html(html);
		}
	});
}
/* jkjson(); */
/* Для перезапуска функции ulicajson */
function searchlinejsonulica() {
	jQuery(".searchlinejson").on("input", function () {
		searchlinejson = jQuery(".searchlinejson").val();
		ulicajson(searchlinejson);
	});
}
/* searchlinejson(); */

/* Действие по выбору ответа */
function clickresponseulica() {
	jQuery(".jsonresponse").on("click", ".thisnameresp", function () {
		content = jQuery(this).text();
		jQuery(".searchlinejson").val(content);
		jQuery(".jsonresponse").html("");
	});
}
/* clickresponsejk(); */










/* Получение подсказок Дома*/
function domjson(thissearch) {
	html = "";
	city = localStorage.getItem("namecity");
	ulica = jQuery(".searchlinejson").val()
	geocode = thissearch;
	jQuery.ajax({
		url: "https://geocode-maps.yandex.ru/1.x/",
		type: "get",
		data: {
			"apikey": "8fa1f586-0f65-49a6-a6d2-23e4fe7a2f08",
			"format": "json",
			/* "geocode": "Россия Москва ЖК" */
			"geocode": city + ' ' + ulica + ' ' + geocode
		},
		success: function (rezul) {
			obj = rezul;
			console.log(rezul);
			/* jQuery(".jsonresponse").html(rezul); */
			console.log("<br /> ------------------------------------------------<br /> Первый " + obj.response.GeoObjectCollection.featureMember);

			arr = obj.response.GeoObjectCollection.featureMember;
			var n = arr.length;
			console.log("Массив состоит из " + n + " Элементов");
			for (var i = 0; i <= n - 1; i++) {
				console.log(arr[i]);
				console.log("<br /> номер i = " + i);
				console.log("<br /> текущий дом = " + arr[i].GeoObject.name);

				/* html = html + '<div class="thisnameresp" data-adress="' + arr[i].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AddressLine + '">' + arr[i].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.Locality.Thoroughfare.Premise.PremiseNumber + '</div>'; */

				domcomponent = arr[i].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;
				var n2 = domcomponent.length;
				console.log("Массив domcomponent состоит из " + n2 + " Элементов");
				for (var i2 = 0; i2 <= n2 - 1; i2++) {
					console.log("Запущен перебор компонент");
					if (domcomponent[i2].kind == "house") {
						kind = domcomponent[i2].kind;
						dom = domcomponent[i2].name;
						console.log("kind = " + kind);
						console.log("DOM = " + dom);
					}
				}

				if (dom) {
					domtoline = dom;
					html = html + '<div class="thisnameresp" data-adress="' + arr[i].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AddressLine + '">' + dom + '</div>';
				}


			}
			jQuery(".jsonresponsedom").html(html);
		}
	});
}
/* jkjson(); */
/* Для перезапуска функции ulicajson */
function searchlinejsondom() {
	jQuery(".searchlinejsondom").on("input", function () {
		searchlinejson = jQuery(".searchlinejsondom").val();
		domjson(searchlinejson);
	});
}
/* searchlinejson(); */

/* Действие по выбору ответа */
function clickresponsedom() {
	jQuery(".jsonresponsedom").on("click", ".thisnameresp", function () {
		content = jQuery(this).text();
		jQuery(".searchlinejsondom").val(content);
		adresss = jQuery(this).data("adress");
		jQuery(".jsonresponsedom").html("");
		jQuery(".jsonresponseadress").html(adresss);
	});
}
/* clickresponsejk(); */



/* -------------------------------------------------------------------------------------------------------------------- */


function andgotoindex() {
	if (jQuery(".changenameuser").val() == "") {
		alert("Имя не должно быть пустым");
	} else {
		location.href = "index.html";
	}
}
function fixandgotoindex() {
	jQuery("body").on("click", ".andgotoindex", function () {
		setTimeout(andgotoindex, 1500);
	});
}