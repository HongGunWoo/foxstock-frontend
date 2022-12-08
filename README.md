[최종 발표 시연 영상](https://youtu.be/tYAhlO_otm4)

<h1 align="center">여우의 주식 레시피</h1>

<p align="center">
  한국 전체 주식 종목에 대한 예상 수익률과 추천 구매가, 상세 주식 정보를 알 수 있습니다.
</p>

[demo(WEB Version)](http://foxrain.tk/)

## App ScreenShot
<p align="center">
<img width="300" alt="inital page" src="https://user-images.githubusercontent.com/45515388/206373245-05786180-6990-4264-bc4a-ea1d5d13e6aa.jpg">
<img width="300" alt="inital page" src="https://user-images.githubusercontent.com/45515388/206373389-67f34906-5a57-4933-a93d-d661d85412a1.jpg">
<img width="300" alt="inital page" src="https://user-images.githubusercontent.com/45515388/206373318-13e2b5ba-a1e8-4e2c-90bf-2e3cc1ab24bc.jpg">
</p>

## Features
- 추천 구매가 - 1년 후 15%의 수익을 얻을 확률이 높은 구매가
- 예상 수익률 - 현재가에서 매수했을 때 1년 후 얻을 수 있는률수익률
- 관심 주식 종목 담기
- 주식 종목 검색
- 전체 종목, KOSPI, KOSDAQ 중 원하는 항목 선택
- 상세 주식 페이지를 통한 1년 주식 가격 차트, BPS, ROE, PBR, 기업 정보 확인
- 원하는 주식 종목 검색

## How to calculate?
- 추천 구매가:
$\frac{BPS \times ROE^{10}}{목표수익률^{10}} = 추천구매가$

- 예상 수익률:
$\frac{ROE^{10}}{PBR} = 예상수익률^{10}$

계산 식은 책 ["다시 쓰는 주식 투자 교과서"](http://www.yes24.com/Product/Goods/66889829) 를 참고하였습니다.





## Stack
![Generic badge](https://img.shields.io/badge/Reactnative-0.69.6-brightgreen.svg)
![Generic badge](https://img.shields.io/badge/Expo-~46.0.13-green.svg)
![Generic badge](https://img.shields.io/badge/ReactNavigation-^6.0.13-yellow.svg)
![Generic badge](https://img.shields.io/badge/ReactNativePaper-^4.12.5-yellow.svg)
![Generic badge](https://img.shields.io/badge/ReactQuery-^4.10.3-green.svg)

## Target Platform
- Web
- Android
- IOS

## Install
```sh
npm install -g expo-cli
npm install
```

## Run
```sh
expo start
```

## Get the app
- [Android](https://expo.dev/accounts/gugugu/projects/fox-stock/builds/4760a3c0-8a3b-439b-a432-f4b677375f45)
- [WEB Link](http://foxrain.tk/)


[중간 발표 시연 영상](https://youtu.be/Nc12wU7hgC8)

