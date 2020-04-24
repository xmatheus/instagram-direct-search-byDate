let GlmaxChats = 20; //valor padrao quantidade de chats a serem abertos
let listChats = null;
let end = false; //um set timeout foi despachado para o final do algoritmo(varias condicoes para o final do algoritmo)
let scrollEnd = true; //final do scroll das conversas
let clientUser = null; //@ do usuario da extensao
let clientUserMsgTotal = 0;
let peopleMsgTotal = 0;

let dateCompare = {
	start: "01/12/2019", //		default: dia/mes/ano
	end: "22/04/2020",
};

let week = {
	Sunday: { day: "Domingo", dayofweek: null },
	Monday: { day: "Segunda", dayofweek: null },
	Tuesday: { day: "Terça-feira", dayofweek: null },
	Wednesday: { day: "Quarta-feira", dayofweek: null },
	Thursday: { day: "Quinta-fera", dayofweek: null },
	Friday: { day: "Sexta-feira", dayofweek: null },
	Saturday: { day: "Sabado", dayofweek: null },
};

let Arrayweek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const setDoneDayofWeek = () => {
	//func que corrige os dias da semnana do instagram, ela pega o dia da semana e converte para mes/dia/ano
	for (let i = 0; i < 7; i++) {
		let now = new Date();
		let lastDay = new Date(now.setDate(now.getDate() - i));
		let day = Arrayweek[lastDay.getDay()];
		week[day].dayofweek =
			lastDay.getUTCDate() +
			"/" +
			(lastDay.getUTCMonth() + 1) +
			"/" +
			lastDay.getUTCFullYear();
	}
};
setDoneDayofWeek();
console.log({ week });

const getClientUser = () => {
	let a = document.querySelector("._2dbep.qNELH.kIKUG");
	if (a) {
		clientUser = a.href.split(".com/")[1].split("/")[0];
	}
};

getClientUser();

let month = {
	January: 1,
	February: 2,
	March: 3,
	April: 4,
	May: 5,
	June: 6,
	July: 7,
	August: 8,
	September: 9,
	October: 10,
	November: 11,
	December: 12,
};

const compareDateInputDates = (dateO, DateT) => {
	console.log(dateO, DateT);
	D_1 = dateO.split("/");
	D_2 = DateT.split("/");

	let d1 = new Date(D_1[2], parseInt(D_1[1]) - 1, D_1[0]);
	let d2 = new Date(D_2[2], parseInt(D_2[1]) - 1, D_2[0]);

	if (d1 > d2) {
		return true;
	} else {
		return false;
	}
};

const createLayout = () => {
	const div = document.querySelector(
		".pV7Qt._6Rvw2.Igw0E.IwRSH.YBx95.ybXk5._4EzTm.i0EQd"
	);

	if (div) {
		const mainDiv = document.createElement("div");
		const oneDateDiv = document.createElement("div");
		const secDateDiv = document.createElement("div");
		const maxChatsDiv = document.createElement("div");
		const subDatediv = document.createElement("div");
		const subTwoDatediv = document.createElement("div");
		const secDiv = document.createElement("div");
		const containerInputs = document.createElement("div");
		const containerKeyworlds = document.createElement("div");

		subDatediv.className = "containerOne";
		subTwoDatediv.className = "containerOne";
		secDiv.className = "containerOne";
		oneDateDiv.className = "containerDate";
		secDateDiv.className = "containerDate";
		maxChatsDiv.className = "containerDate";

		containerInputs.className = "containerInputs";
		containerKeyworlds.className = "containerKeyworlds";

		const inputDateOne = document.createElement("input");
		inputDateOne.type = "date";

		const inputDateTwo = document.createElement("input");
		inputDateTwo.type = "date";
		// inputDateOne.placeholder = "Ex.: Rua alameda";

		const myButton = document.createElement("button");
		myButton.innerText = "+";

		const myButtonDate = document.createElement("button");
		myButtonDate.innerText = "+";

		const myTextareatwo = document.createElement("textarea");
		myTextareatwo.placeholder = "Ex.: 10";
		myTextareatwo.classList.add("textAreatwo");

		const myButtontwo = document.createElement("button");
		myButtontwo.innerText = "+";

		const buttonSearch = document.createElement("button");
		buttonSearch.innerText = "Buscar";
		buttonSearch.className = "buttonSearch";

		const spanDateOne = document.createElement("span");
		const spanDateTwo = document.createElement("span");
		const spanTwo = document.createElement("span");

		spanDateOne.innerText = "Data inicial";
		spanDateTwo.innerText = "Data final";
		spanTwo.innerText = "Quantidade de conversas para conferir";

		myButtontwo.addEventListener("click", () => {
			if (myTextareatwo.value) {
				if (/^[0-9]+$/.test(myTextareatwo.value)) {
					GlmaxChats = parseInt(myTextareatwo.value);
				} else {
					alert("apenas números, e também maior que 0");
				}
			}
		});

		myButton.addEventListener("click", () => {
			if (inputDateOne.value) {
				let iday = inputDateOne.value.split("-")[2];
				let imonth = inputDateOne.value.split("-")[1];
				let iyear = inputDateOne.value.split("-")[0];
				dateCompare.start = iday + "/" + imonth + "/" + iyear;
				console.log(dateCompare);
			}
		});

		myButtonDate.addEventListener("click", () => {
			if (inputDateTwo.value) {
				let iday = inputDateTwo.value.split("-")[2];
				let imonth = inputDateTwo.value.split("-")[1];
				let iyear = inputDateTwo.value.split("-")[0];
				dateCompare.end = iday + "/" + imonth + "/" + iyear;
				console.log(dateCompare);
			}
		});

		buttonSearch.addEventListener("click", () => {
			if (!dateCompare.start || !dateCompare.end === 0) {
				alert("Sem duas datas pra comparar o algoritmo não roda");
			} else if (
				compareDateInputDates(dateCompare.start, dateCompare.end)
			) {
				alert("Data final menor que a inicial?!");
			} else {
				Play();
			}
		});

		subDatediv.appendChild(myButton);
		subDatediv.appendChild(inputDateOne);

		subTwoDatediv.appendChild(myButtonDate);
		subTwoDatediv.appendChild(inputDateTwo);

		secDiv.appendChild(myButtontwo); // button definir
		secDiv.appendChild(myTextareatwo); // input de maxChats

		oneDateDiv.appendChild(spanDateOne);
		oneDateDiv.appendChild(subDatediv); //button and input type date

		secDateDiv.appendChild(spanDateTwo);
		secDateDiv.appendChild(subTwoDatediv); //button and input type date

		maxChatsDiv.appendChild(spanTwo);
		maxChatsDiv.appendChild(secDiv);

		containerInputs.appendChild(oneDateDiv);
		containerInputs.appendChild(secDateDiv);
		containerInputs.appendChild(maxChatsDiv);
		// containerInputs.appendChild(spanTwo);
		containerInputs.appendChild(buttonSearch);

		mainDiv.appendChild(containerInputs);
		// mainDiv.appendChild(containerKeyworlds);

		mainDiv.className = "extensionContainer";
		div.parentNode.insertBefore(mainDiv, div);
		return true;
	} else {
		return false;
	}
};

const loop = setInterval(() => {
	if (createLayout()) {
		clearInterval(loop);
	}
}, 1000);

const verifyLayout = setInterval(() => {
	let container = document.querySelector(".extensionContainer");
	if (!container) {
		createLayout();
	}
}, 1000);

//pra cima apenas pra criar o layout pro usuario

const test = async () => {
	const a = await document.querySelectorAll(".-qQT3.rOtsg");
	if (a) {
		return a;
	}
	return null;
};
let updateLoop = setInterval(async () => {
	listChats = await test();
}, 500);

const createCsv = (userChat, msgs) => {
	if (msgs.length > 0) {
		let csv = "user, data, mensagem\n";
		msgs.map((key) => {
			csv +=
				key.user.split(",").join(" ") +
				"," +
				key.date.split(",").join(" ") +
				"," +
				key.span.split(/,|\n/).join(" ");
			csv += "\n";
		});

		let hiddenElement = document.createElement("a");
		hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
		hiddenElement.target = "_blank";
		hiddenElement.download = `${userChat}.csv`;
		hiddenElement.click();
	}
};
const createCsvtotalMsg = () => {
	let csv =
		"Mensagens enviada, Mensagens recebidas, Total de coversas verificadas\n";
	csv += clientUserMsgTotal + "," + peopleMsgTotal + "," + GlmaxChats + "\n";

	let hiddenElement = document.createElement("a");
	hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
	hiddenElement.target = "_blank";
	hiddenElement.download = `result-${dateCompare.start}-ate-${dateCompare.end}.csv`;
	hiddenElement.click();
};

const endIntervalandExit = (intervals) => {
	if (intervals) {
		if (!end) {
			createCsvtotalMsg();
			intervals.forEach((element) => {
				clearInterval(element);
			});

			console.log("[x] A busca terminou. Adeus.");
		}
	} else {
		console.log("[!] Erro com os Interval.");
	}
};
function convertTo24Hour(time) {
	var hours = parseInt(time.substring(":"));
	if (time.indexOf("am") != -1 && hours == 12) {
		time = time.replace("12", "0");
	}
	if (time.indexOf("pm") != -1 && hours < 12) {
		time = time.replace(hours, hours + 12);
	}
	return time.replace(/(am|pm)/, "");
}

const filterDate = (date) => {
	let splitDate = date.split(" ");
	let nowDateO = new Date();

	if (splitDate.length === 2) {
		if (
			splitDate[0]
				.toLowerCase()
				.includes(Arrayweek[nowDateO.getDay()].toLowerCase())
		) {
			//arrumando erro de data do instagram
			nowDateO.setDate(nowDateO.getDate() - 7);
			let daynowO =
				nowDateO.getUTCDate() +
				"/" +
				(nowDateO.getUTCMonth() + 1) +
				"/" +
				nowDateO.getUTCFullYear();

			return {
				dateFiltred: daynowO,
				hour: convertTo24Hour(splitDate[1].toLowerCase()),
			};
		}

		if (week[splitDate[0]]) {
			return {
				dateFiltred: week[splitDate[0]].dayofweek,
				hour: convertTo24Hour(splitDate[1].toLowerCase()),
			};
		} else {
			let now = new Date();
			let daynow =
				now.getUTCDate() +
				"/" +
				(now.getUTCMonth() + 1) +
				"/" +
				now.getUTCFullYear();
			return {
				dateFiltred: daynow,
				hour: convertTo24Hour(
					splitDate[0] + splitDate[1].toLowerCase()
				),
			};
		}
	} else {
		if (week[splitDate[0]]) {
			return {
				dateFiltred: week[splitDate[0]].dayofweek,
				hour: convertTo24Hour(
					splitDate[1] + splitDate[2].toLowerCase()
				),
			};
		} else if (splitDate[0].includes("Yesterday")) {
			let dateNow = new Date();
			dateNow.setDate(dateNow.getDate() - 1);

			let daynow =
				dateNow.getUTCDate() +
				"/" +
				(dateNow.getUTCMonth() + 1) +
				"/" +
				dateNow.getUTCFullYear();

			return {
				dateFiltred: daynow,
				hour: convertTo24Hour(
					splitDate[1] + splitDate[2].toLowerCase()
				),
			};
		} else {
			let nowMoth = month[splitDate[0]];
			let nowDay = splitDate[1].split(",")[0];
			let nowYear = splitDate[2];

			let nowHour = convertTo24Hour(
				splitDate[3] + splitDate[4].toLowerCase()
			);
			return {
				dateFiltred: nowDay + "/" + nowMoth + "/" + nowYear,
				hour: nowHour,
			};
		}
	}
};

const compareDate = (date) => {
	D_1 = dateCompare.start.split("/");
	D_2 = dateCompare.end.split("/");
	D_3 = date.split("/");

	var d1 = new Date(D_1[2], parseInt(D_1[1]) - 1, D_1[0]);
	var d2 = new Date(D_2[2], parseInt(D_2[1]) - 1, D_2[0]);
	var d3 = new Date(D_3[2], parseInt(D_3[1]) - 1, D_3[0]);

	if (d3 >= d1 && d3 <= d2) {
		return true;
	} else {
		return false;
	}
};

const verifywhoSend = (divSpan) => {
	try {
		for (let i = 0; i < 5; i++) {
			if (
				divSpan.parentElement.parentElement.className ===
				"   _6FEQj CMoMH   RQUXn _8_yLp  "
			) {
				return true;
			}

			divSpan = divSpan.parentElement;
		}

		return false;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getMensages = async (people) => {
	let containerChat = await document.querySelector(".VUU41");
	let allDivs = null;
	let span = "";
	let peopleMessages = [];
	let whoSend = null;

	if (containerChat) {
		allDivs = await containerChat.querySelectorAll(
			"._7UhW9.PIoXz.MMzan._0PwGv.fDxYl.l4b0S, ._7UhW9.xLCgt.MMzan.KV-D4.p1tLr.hjZTB"
		);
	}

	let subContainer = {
		date: null,
		spans: [],
	};
	for (let j = 0; j < allDivs.length; j++) {
		if (
			/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(
				allDivs[j].innerText
			)
		) {
			if (subContainer.date !== null) {
				subContainer = {
					date: null,
					spans: [],
				};
			}
			let { dateFiltred } = filterDate(allDivs[j].innerText);

			subContainer.date = dateFiltred;
		} else {
			span = allDivs[j].innerText;
			span = span.toLowerCase();
			if (span) {
				if (compareDate(subContainer.date)) {
					if (verifywhoSend(allDivs[j])) {
						whoSend = clientUser;
						clientUserMsgTotal += 1;
					} else {
						whoSend = people;
						peopleMsgTotal += 1;
					}

					peopleMessages.push({
						user: whoSend,
						date: subContainer.date,
						span: span,
					});
				}
			}
		}
	}
	createCsv(people, peopleMessages);
};

const getMensagesAndCompareFirstDate = () => {
	let containerChat = document.querySelector(".VUU41");
	let allDivs = null;

	const cmpDates = (dateO, DateT) => {
		D_1 = dateO.split("/");
		D_2 = DateT.split("/");

		let d1 = new Date(D_1[2], parseInt(D_1[1]) - 1, D_1[0]);
		let d2 = new Date(D_2[2], parseInt(D_2[1]) - 1, D_2[0]);

		if (d1 < d2) {
			return true;
		} else {
			return false;
		}
	};

	if (containerChat) {
		allDivs = containerChat.querySelectorAll(
			"._7UhW9.PIoXz.MMzan._0PwGv.fDxYl.l4b0S, ._7UhW9.xLCgt.MMzan.KV-D4.p1tLr.hjZTB"
		);
	}

	let lastDate = null;
	if (allDivs) {
		for (let j = 0; j < allDivs.length; j++) {
			if (
				/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(
					allDivs[j].innerText
				)
			) {
				let { dateFiltred } = filterDate(allDivs[j].innerText);
				lastDate = dateFiltred;
			}
		}
	}

	if (lastDate) {
		if (cmpDates(lastDate, dateCompare.start)) {
			return false; // ultima date e menor que a primeira data de comparacao
		} else {
			return true; // ultima date e maior que a primeira data de comparacao
		}
	}
	return true;
};

const scrollChattoTop = (people) => {
	if (getMensagesAndCompareFirstDate()) {
		scrollEnd = false;

		const scrollinterval = setInterval(() => {
			try {
				let scrollChat = document.querySelectorAll(".frMpI.-sxBV");
				if (scrollChat[0].scrollTop === scrollChat[0].scrollTop * -1) {
					getMensages(people);
					setTimeout(() => (scrollEnd = true), 600);

					clearInterval(scrollinterval);
					console.log("[x] scroll end");
				} else {
					scrollChat[0].scrollTop = scrollChat[0].scrollTop * -1;
				}
			} catch (error) {
				console.log("[x] erro scroll");
			}
		}, 1500);
	} else {
		scrollEnd = true;
	}
};

async function Play() {
	let i = 0;
	let visited = [];
	let oldmaxHeight = 0;
	let people = null;
	end = false;

	let loop = setInterval(async function () {
		if (scrollEnd) {
			if (listChats[i]) {
				people = await listChats[i].querySelector(
					"._7UhW9.xLCgt.MMzan.KV-D4.fDxYl"
				).innerText;
				if (!visited.includes(listChats[i].href)) {
					if (visited.length + 1 <= GlmaxChats) {
						visited.push(listChats[i].href);
						listChats[i].click();
						scrollChattoTop(people);
					}
				}

				if (scrollEnd) {
					if (visited.length === GlmaxChats) {
						//flag pro user definir o max de chats para verificar
						setTimeout(() => {
							endIntervalandExit([
								loop,
								updateLoop,
								verifyLayout,
							]);
							end = true;
						}, 3000);
					}
					if (i === listChats.length) {
						//quando chega no fim das conversas visiveis, o scroll vai pra baixo
						let scroll = document.querySelectorAll(".N9abW");
						oldmaxHeight = scroll[0].scrollHeight;
						scroll[0].scrollTop = scroll[0].scrollHeight;

						if (scroll[0].scrollTop >= scroll[0].scrollHeight) {
							//fim do scroll, fim das conversas
							endIntervalandExit([
								loop,
								updateLoop,
								verifyLayout,
							]);
							end = true;
						}

						setTimeout(() => {
							if (oldmaxHeight === scroll[0].scrollHeight) {
								//scroll nao foi no maximo, mas nao da pra att pq ja acabou as conversas
								setTimeout(() => {
									endIntervalandExit([
										loop,
										updateLoop,
										verifyLayout,
									]);
									end = true;
								}, 3200);
							}
						}, 1000);

						i = 0;
					}
					i++;
				}
			}
		}
	}, 1000);
}
