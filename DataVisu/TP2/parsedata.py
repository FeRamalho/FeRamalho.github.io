import csv
import re

ficheiro = open('campeonato.csv', 'r')
reader = csv.reader(ficheiro)
soma = 0
casa = 0
fora = 0
siglas = []
somaCE = 0
somaBH = 0
somaES = 0
somaGO = 0
somaMG = 0
somaPE = 0
somaPR = 0
somaRJ = 0
somaRS = 0
somaSC = 0
somaSP = 0
for linha in reader:
	#x = re.search
	#print(linha[1]+',', end="")
	if(re.search(r".2017",linha[2])):
		#if(linha[10] == 'CE'):
		#	somaCE = somaCE+ int(linha[8])
		#if(linha[11] == 'CE'):
		#	somaCE = somaCE+ int(linha[9])
		if(linha[10] == 'ES'):
			somaES = somaES+ int(linha[8])
		if(linha[11] == 'ES'):
			somaES = somaES+ int(linha[9])
		if(linha[10] == 'GO'):
			somaGO = somaGO+ int(linha[8])
		if(linha[11] == 'GO'):
			somaGO = somaGO+ int(linha[9])
		if(linha[10] == 'MG'):
			somaMG = somaMG+ int(linha[8])
		if(linha[11] == 'MG'):
			somaMG = somaMG+ int(linha[9])
		if(linha[10] == 'PR'):
			somaPR = somaPR+ int(linha[8])
		if(linha[11] == 'PR'):
			somaPR = somaPR+ int(linha[9])
		if(linha[10] == 'RJ'):
			somaRJ = somaRJ+ int(linha[8])
		if(linha[11] == 'RJ'):
			somaRJ = somaRJ+ int(linha[9])
		if(linha[10] == 'RS'):
			somaRS = somaRS+ int(linha[8])
		if(linha[11] == 'RS'):
			somaRS = somaRS+ int(linha[9])
		if(linha[10] == 'SC'):
			somaSC = somaSC+ int(linha[8])
		if(linha[11] == 'SC'):
			somaSC = somaSC+ int(linha[9])
		if(linha[10] == 'SP'):
			somaSP = somaSP+ int(linha[8])
		if(linha[11] == 'SP'):
			somaSP = somaSP+ int(linha[9])
		if(linha[10] == 'BH'):
			somaBH = somaBH+ int(linha[8])
		if(linha[11] == 'BH'):
			somaBH = somaBH+ int(linha[9])
		if(linha[10] == 'PE'):
			somaPE = somaPE+ int(linha[8])
		if(linha[11] == 'PE'):
			somaPE = somaPE+ int(linha[9])
print(somaBH,somaES,somaGO,somaMG,somaPE,somaPR,somaRJ,somaRS,somaSC,somaSP)
		#if(linha[11] not in siglas):
		#	print(linha[11])
		#siglas.append(linha[11])
		#p1 = int(linha[8])
		#p2 = int(linha[9])
		#casa = casa+p1
		#fora = fora+p2
#print(casa+fora)
#print(casa)
#print(fora)
		#if(linha[3] == 'Vasco' or linha[4] == 'Vasco' or linha[3] == 'VASCO' or linha[4] == 'VASCO'):
		#	if(linha[5] == 'Vasco' or linha[5] == 'VASCO'):
		#		soma = soma + 3
		#	if(linha[5] == '-'):
		#		soma = soma + 1
		#	print(linha[3]+','+ linha[4]+','+ linha[5]+','+ linha[6]+','+ linha[8]+','+ linha[9]+','+ str(soma))
	#	if(linha[3] == 'Vasco' or linha[3] == 'VASCO'):
	#		print(linha[4])
	#	elif(linha[4] == 'Vasco' or linha[4] == 'VASCO'):
	#		print(linha[3])
		#	print(soma)