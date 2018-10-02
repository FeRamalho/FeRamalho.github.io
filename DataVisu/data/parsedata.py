import csv

ficheiro = open('partidos.csv', 'r')
reader = csv.reader(ficheiro)
soma = 0
soma1 = 0
soma2 = 0
soma3 = 0
soma4 = 0
soma5 = 0
soma6 = 0
soma7 = 0
soma8 = 0
soma9 = 0
soma10 = 0
est = 'TO'
for linha in reader:
	if linha[0] == 'TO':
		if linha[1] == 'PCB':
			soma = soma + int(linha[2])
			#print(linha[0]+','+linha[1]+','+linha[2]+','+linha[3])
		if linha[1] == 'PCO':
			soma1 = soma1 + int(linha[2])
		if linha[1] == 'PRTB':
			soma2 = soma2 + int(linha[2])
		if linha[1] == 'PSB':
			soma3 = soma3 + int(linha[2])
		if linha[1] == 'PSC':
			soma4 = soma4 + int(linha[2])
		if linha[1] == 'PSDB':
			soma5 = soma5 + int(linha[2])
		if linha[1] == 'PSDC':
			soma6 = soma6 + int(linha[2])
		if linha[1] == 'PSOL':
			soma7 = soma7 + int(linha[2])
		if linha[1] == 'PSTU':
			soma8 = soma8 + int(linha[2])
		if linha[1] == 'PT':
			soma9 = soma9 + int(linha[2])
		if linha[1] == 'PV':
			soma10 = soma10 + int(linha[2])
print(est+',PCB,',soma)
print(est+',PCO,',soma1)
print(est+',PRTB,',soma2)
print(est+',PSB,',soma3)
print(est+',PSC,',soma4)
print(est+',PSDB,',soma5)
print(est+',PSDC,',soma6)
print(est+',PSOL,',soma7)
print(est+',PSTU,',soma8)
print(est+',PT,',soma9)
print(est+',PV,',soma10)

#for linha in reader:
#	if linha[4] == 'PSTU':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PRTB':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PCB':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PSOL':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PV':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PSC':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PSDC':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PCO':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PT':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PSDB':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])
#	if linha[4] == 'PSB':
#		print(linha[2] +','+ linha[3]+','+linha[4]+','+linha[9]+','+linha[10])