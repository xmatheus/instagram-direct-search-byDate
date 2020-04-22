let Glkeyworlds = []; //palavras que o user quer buscar
let GlmaxChats = 20; //valor padrao quantidade de chats a serem abertos
let Glmatch = {};
let listChats = null;
let end = false;
let scrollEnd = true;
let clientUser = null;

let dateCompare = {
	start: "01/12/2019",
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

const getClientUser = () => {
	let a = document.querySelector("._2dbep.qNELH.kIKUG");
	if (a) {
		clientUser = a.href.split(".com/")[1].split("/")[0];
	}

	// console.log(clientUser);
};

getClientUser();
// console.log({ week });

// let month = {
// 	January: "Janeiro",
// 	February: "Fevereiro",
// 	March: "Março",
// 	April: "Abril",
// 	May: "Maio",
// 	June: "Junho",
// 	July: "Julho",
// 	August: "Agosto",
// 	September: "Setembro",
// 	October: "Outubro",
// 	November: "Novembro",
// 	December: "Dezembro",
// };

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

const createLabelstoKeyworlds = (keyworlds) => {
	const label = document.createElement("span");
	label.innerText = keyworlds;
	label.className = "labelKeyworlds";
	label.title = "clique para excluir";

	if (!Glkeyworlds.includes(keyworlds.toLowerCase())) {
		Glkeyworlds.push(keyworlds.toLowerCase());
	} else {
		alert("Opa, tu ja inseriu essa");
		return null;
	}

	label.addEventListener("click", () => {
		Glkeyworlds = Glkeyworlds.filter((item) => {
			return item !== label.innerText.toLocaleLowerCase();
		});
		label.parentNode.removeChild(label);
	});
	return label;
};

const createLabelstoKeyworldsResetLayout = (keyworlds) => {
	const label = document.createElement("span");
	label.innerText = keyworlds.toLowerCase();
	label.className = "labelKeyworlds";
	label.title = "clique para excluir";

	label.addEventListener("click", () => {
		Glkeyworlds = Glkeyworlds.filter((item) => {
			return item !== label.innerText.toLocaleLowerCase();
		});
		label.parentNode.removeChild(label);
	});
	return label;
};

const createLayout = () => {
	const div = document.querySelector(
		".pV7Qt._6Rvw2.Igw0E.IwRSH.YBx95.ybXk5._4EzTm.i0EQd"
	);

	if (div) {
		const mainDiv = document.createElement("div");
		const oneDiv = document.createElement("div");
		const secDiv = document.createElement("div");
		const containerInputs = document.createElement("div");
		const containerKeyworlds = document.createElement("div");
		const gridLayout = document.createElement("div");

		oneDiv.className = "containerOne";
		secDiv.className = "containerOne";
		containerInputs.className = "containerInputs";
		containerKeyworlds.className = "containerKeyworlds";
		gridLayout.className = "gridLayout";

		const myTextarea = document.createElement("input");
		myTextarea.type = "date";
		// myTextarea.placeholder = "Ex.: Rua alameda";

		const myButton = document.createElement("button");
		myButton.innerText = "+";

		const myTextareatwo = document.createElement("textarea");
		myTextareatwo.placeholder = "Ex.: 10";
		myTextareatwo.classList.add("textAreatwo");

		const myButtontwo = document.createElement("button");
		myButtontwo.innerText = "definir";

		const buttonSearch = document.createElement("button");
		buttonSearch.innerText = "Buscar";
		buttonSearch.className = "buttonSearch";

		const spanOne = document.createElement("span");
		const spanTwo = document.createElement("span");

		spanOne.innerText =
			"Add as palavras para serem procuradas(uma por vez, ou uma frase)";
		spanTwo.innerText =
			"Coloque a quantidade de conversas que você deseja conferir";

		myButton.addEventListener("click", () => {
			if (myTextarea.value) {
				let result = createLabelstoKeyworlds(myTextarea.value);
				if (result) {
					myTextarea.value = "";
					gridLayout.appendChild(result);
				}

				// console.log(Glkeyworlds);
			}
		});

		myButtontwo.addEventListener("click", () => {
			if (myTextareatwo.value) {
				if (/^[0-9]+$/.test(myTextareatwo.value)) {
					GlmaxChats = parseInt(myTextareatwo.value);
				} else {
					alert("apenas números, e também maior que 0");
				}
			}
		});

		buttonSearch.addEventListener("click", () => {
			if (Glkeyworlds.length === 0) {
				alert("Sem palavra pra buscar o algoritmo não roda");
			} else {
				Play();
			}
		});

		if (Glkeyworlds.length > 0) {
			Glkeyworlds.map((key) => {
				let result = createLabelstoKeyworldsResetLayout(key);
				if (result) {
					gridLayout.appendChild(result);
				}
			});
		}

		containerKeyworlds.appendChild(gridLayout);

		oneDiv.appendChild(myButton);
		oneDiv.appendChild(myTextarea);

		secDiv.appendChild(myButtontwo);
		secDiv.appendChild(myTextareatwo);

		containerInputs.appendChild(spanOne);
		containerInputs.appendChild(oneDiv);
		containerInputs.appendChild(spanTwo);
		containerInputs.appendChild(secDiv);
		containerInputs.appendChild(buttonSearch);

		mainDiv.appendChild(containerInputs);
		mainDiv.appendChild(containerKeyworlds);

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
				key.span.split(",").join(" ");
			csv += "\n";
		});

		let hiddenElement = document.createElement("a");
		hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
		hiddenElement.target = "_blank";
		hiddenElement.download = `${userChat}.csv`;
		hiddenElement.click();
	}
};

const endIntervalandExit = (intervals) => {
	if (intervals) {
		if (!end) {
			intervals.forEach((element) => {
				clearInterval(element);
			});
			// console.log(Glmatch);
			// createCsv();
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

	if (splitDate.length === 2) {
		if (week[splitDate[0]]) {
			return {
				dateFiltred: week[splitDate[0]].dayofweek,
				hour: convertTo24Hour(splitDate[1].toLowerCase()),
			};
			// return (
			// 	week[splitDate[0]].dayofweek +
			// 	" " +
			// 	convertTo24Hour(splitDate[1].toLowerCase())
			// );
		} else {
			let now = new Date();
			let daynow =
				now.getUTCDate() +
				"/" +
				(now.getUTCMonth() + 1) +
				"/" +
				now.getUTCFullYear();
			// console.log("2");
			return {
				dateFiltred: daynow,
				hour: convertTo24Hour(
					splitDate[0] + splitDate[1].toLowerCase()
				),
			};
		}
	} else {
		if (week[splitDate[0]]) {
			// console.log(week[splitDate[0]].dayofweek);
			// console.log("3");
			return {
				dateFiltred: week[splitDate[0]].dayofweek,
				hour: convertTo24Hour(
					splitDate[1] + splitDate[2].toLowerCase()
				),
			};
			// return (
			// 	week[splitDate[0]].dayofweek +
			// 	" " +
			// 	convertTo24Hour(splitDate[1] + splitDate[2].toLowerCase())
			// );
		} else if (splitDate[0].includes("Yesterday")) {
			let dateNow = new Date();
			dateNow.setDate(dateNow.getDate() - 1);

			let daynow =
				dateNow.getUTCDate() +
				"/" +
				(dateNow.getUTCMonth() + 1) +
				"/" +
				dateNow.getUTCFullYear();
			// console.log("4");
			return {
				dateFiltred: daynow,
				hour: convertTo24Hour(
					splitDate[1] + splitDate[2].toLowerCase()
				),
			};
			// 	return (
			// 	daynow +
			// 	" " +
			// 	convertTo24Hour(splitDate[1] + splitDate[2].toLowerCase())
			// );
		} else {
			let nowMoth = month[splitDate[0]];
			let nowDay = splitDate[1].split(",")[0];
			let nowYear = splitDate[2];

			let nowHour = convertTo24Hour(
				splitDate[3] + splitDate[4].toLowerCase()
			);
			// console.log("5");
			return {
				dateFiltred: nowDay + "/" + nowMoth + "/" + nowYear,
				hour: nowHour,
			};
			// return nowMoth + "/" + nowDay + "/" + nowYear + " " + nowHour;
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

	if (d3 > d1 && d3 < d2) {
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
	// let peopleMessages = {
	// 	user: null,
	// 	date: null,
	// 	msg: null,
	// };
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
				// searchInText(subContainer.spans, keyFilter);
				// peopleMessages.msg.push(subContainer);
				// console.log(subContainer);
				subContainer = {
					date: null,
					spans: [],
				};
			}
			let { dateFiltred, hour } = filterDate(allDivs[j].innerText);

			subContainer.date = dateFiltred;
		} else {
			span = allDivs[j].innerText;
			span = span.toLowerCase();
			if (span) {
				// console.log(span);
				Glkeyworlds.map((key) => {
					span.includes(key)
						? Glmatch[key].push({
								date: subContainer.date,
								name: people,
						  })
						: null;
				});

				if (compareDate(subContainer.date)) {
					if (verifywhoSend(allDivs[j])) {
						whoSend = clientUser;
					} else {
						whoSend = people;
					}

					// console.log(
					// 	`send by${whoSend}  \n Date => ${subContainer.date} \n msg => ${dateCompare}`
					// );
					// console.log("Mensagem entre a data", span);

					peopleMessages.push({
						user: whoSend,
						date: subContainer.date,
						span: span,
					});
				}
			}
		}
		if (subContainer.date === null || j === allDivs.length - 1) {
			// peopleMessages.msg.push(subContainer);
		}
	}
	createCsv(people, peopleMessages);
	// console.log(subContainer);
};

// const scrollMessage = new Promise(function (resolve, reject, people) {
// 	let scrollinterval = setInterval(() => {
// 		let scrollChat = document.querySelectorAll(".frMpI.-sxBV");
// 		if (scrollChat[0].scrollTop === scrollChat[0].scrollTop * -1) {
// 			clearInterval(scrollinterval);
// 			scrollEnd = true;
// 			getMensages(people);
// 			console.log("terminamo");
// 			resolve();
// 		} else {
// 			console.log("Ta indo");

// 			scrollChat[0].scrollTop = scrollChat[0].scrollTop * -1;
// 		}
// 	}, 600);
// });

const taskResolution = (people) => {
	scrollEnd = false;
	return new Promise((resolve, reject) => {
		const scrollinterval = setInterval(() => {
			try {
				let scrollChat = document.querySelectorAll(".frMpI.-sxBV");
				if (scrollChat[0].scrollTop === scrollChat[0].scrollTop * -1) {
					getMensages(people);
					setTimeout(() => (scrollEnd = true), 600);
					setTimeout(() => {
						resolve("conclui");
					}, 800);
					clearInterval(scrollinterval);
					console.log("terminamo");
				} else {
					console.log("Ta indo");

					scrollChat[0].scrollTop = scrollChat[0].scrollTop * -1;
				}
			} catch (error) {
				reject("nao conclui");
			}
		}, 1500);
	});
};

// function taskResolution(x) {
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve(x);
// 		}, 4000);
// 	});
// }

async function Play() {
	let i = 0;
	let visited = [];
	let oldmaxHeight = 0;
	let people = null;
	end = false;
	let playTwo = null;

	Glkeyworlds.map((key) => {
		Glmatch[key] = [];
	});
	// console.log(Glmatch);

	let loop = setInterval(async function () {
		if (scrollEnd) {
			if (listChats[i]) {
				//listChats[i] sendo att a cada 500ms
				console.log(i, scrollEnd, listChats[i]);

				people = await listChats[i].querySelector(
					"._7UhW9.xLCgt.MMzan.KV-D4.fDxYl"
				).innerText;
				if (!visited.includes(listChats[i].href)) {
					if (visited.length + 1 <= GlmaxChats) {
						visited.push(listChats[i].href);
						// scrollEnd = false;
						listChats[i].click();
						// setTimeout(async () => {
						playTwo = taskResolution(people);
						// console.log(playTwo);
						// getMensages(people);
						// }, 900);
						// i = i - 1; //instagram att os nodes, preciso voltar uma posicao para nao pular ninguem
					}
				}
				// else {
				// 	console.log("negado", people);
				// }

				// playTwo
				// 	.then(() => {
				if (scrollEnd) {
					console.log("Dentro da flag");
					// i = i - 1; //instagram att os nodes, preciso voltar uma posicao para nao pular ninguem
					// flag = true;
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
				// })
				// .catch(() => {
				// 	alert("Erro no scroll das mensagens");
				// 	endIntervalandExit([loop, updateLoop, verifyLayout]);
				// 	end = true;
				// });
			}
		}
	}, 1000);
}
