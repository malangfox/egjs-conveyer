# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.8.0](https://github.com/naver/egjs-conveyer/compare/1.1.0...1.8.0) (2025-04-18)
### :sparkles: Packages
* `@egjs/conveyer` 1.8.0
* `@egjs/react-conveyer` 1.8.0
* `@egjs/svelte-conveyer` 1.8.0
* `@egjs/vue-conveyer` 1.8.0
* `@egjs/vue2-conveyer` 1.8.0
* `@egjs/ngx-conveyer` 1.8.0


### :rocket: New Features

* All
    * add cfcs module (#17) ([6dc1715](https://github.com/naver/egjs-conveyer/commit/6dc17158b701fa9cf997bec9dff8dd7be4d79eaf))
    * add intersection option (#46) ([091fda5](https://github.com/naver/egjs-conveyer/commit/091fda54a5a669d8db26d6829a3d1b2b6b9a211d))
* `@egjs/conveyer`
    * add boundaryMargin option (#40) ([5d1cf77](https://github.com/naver/egjs-conveyer/commit/5d1cf7752d179d34e35ebd5843a628306f4d0e7d))
    * add nested option (#11) ([f4bd222](https://github.com/naver/egjs-conveyer/commit/f4bd2221d0d3dd1432ce9e9e2ed0874ce0783061))
    * add useResizeObserver option (#51) ([57138e7](https://github.com/naver/egjs-conveyer/commit/57138e7923e00705e6d275bbd750c2e0db90cfea))
    * use side wheel to move conveyer (#15) ([3cdeab5](https://github.com/naver/egjs-conveyer/commit/3cdeab57a53cae679972696f034b325f7dd3c32c))
* `@egjs/ngx-conveyer`
    * **ngx-conveyer:** reduce view updates and fix outputs (#32) ([85c6c30](https://github.com/naver/egjs-conveyer/commit/85c6c30d90ced259017ee20e002e257eb4cc1034))


### :bug: Bug Fix

* All
    * fix commonjs issue (#29) ([cc62f6f](https://github.com/naver/egjs-conveyer/commit/cc62f6fbffd6d183810108337a8b49e9ad476ced))
    * fix isReachStart's default value (#18) ([9c49266](https://github.com/naver/egjs-conveyer/commit/9c492663a45ca2ec0eabdfae85892906003a6fe9))
    * fix svelte field (#28) ([998ccee](https://github.com/naver/egjs-conveyer/commit/998ccee276579ab09aaf0eaa519d7b8a39fe084e))
* `@egjs/vue2-conveyer`, `@egjs/vue-conveyer`, `@egjs/svelte-conveyer`, `@egjs/react-conveyer`, `@egjs/conveyer`
    * add declaration files to package (#23) ([8b907db](https://github.com/naver/egjs-conveyer/commit/8b907dbcc803b237d65ff82b84e922a08dc59930))
* `@egjs/conveyer`
    * check autoInit must be false (#22) ([d86581d](https://github.com/naver/egjs-conveyer/commit/d86581d1827ae79954df84c2165e6e33659fd5e1))
    * fix animation offset for deciaml point (#58) ([066a71e](https://github.com/naver/egjs-conveyer/commit/066a71e8c524db5c1ce1f8655dbdfc70541a963e))
    * fix autoInit option not working correctly (#21) ([11bb2f1](https://github.com/naver/egjs-conveyer/commit/11bb2f178c983e4576765ee42850613142b8d239))
    * fix incorrect isTrusted value in finishScroll event (#41) ([7a32ec8](https://github.com/naver/egjs-conveyer/commit/7a32ec86ebc98ae663b5c460aa40af3e5ab32a74))
    * fix instanceof Element (#38) ([72fec40](https://github.com/naver/egjs-conveyer/commit/72fec4029eafe87cd3e387939f9e89edf6179573))
    * fix no intersection item with intersection option (#49) ([7de868b](https://github.com/naver/egjs-conveyer/commit/7de868bea09999c1f02c3758e763302a383161ec))
    * fix scroll methods moving to invalid position (#53) ([a8bbe20](https://github.com/naver/egjs-conveyer/commit/a8bbe201bf69081603cbdeb7b316e94aa746bee8))
    * remove axes instance on destory (#26) ([f7e7769](https://github.com/naver/egjs-conveyer/commit/f7e7769fc4ee9e9ba4d58f228ce3ac4480d00d9f))
    * scrollIntoView ending earlier than the duration given as an option (#35) ([3a42aa3](https://github.com/naver/egjs-conveyer/commit/3a42aa3fad6a860ec5d679c953b26c8168a3eeb2))
    * set isHold to false when release occur (#34) ([07ae681](https://github.com/naver/egjs-conveyer/commit/07ae68193d94b896e5dbc9b0f2cda7a86bed38e8))
    * set isReachEnd (#13) ([5ad7ee0](https://github.com/naver/egjs-conveyer/commit/5ad7ee07e32c9ca1f4765ebc2d62a2b2e5a19c94))
    * update axes version (#20) ([57f83fa](https://github.com/naver/egjs-conveyer/commit/57f83fada28dec52bf63a0bf448dd22030df63d2))
    * use preventClickOnDrag of Axes (#43) ([1743ce1](https://github.com/naver/egjs-conveyer/commit/1743ce190235477d3a76f054afcbe03a921618cc))
* `@egjs/svelte-conveyer`
    * fix incorrect main/module/exports. (#24) ([976d2aa](https://github.com/naver/egjs-conveyer/commit/976d2aa27d4000bd5733325059913793b1542a6d))
* Other
    * fix broken document link (#30) ([a716e2a](https://github.com/naver/egjs-conveyer/commit/a716e2ac0b4cf975420de9e8cd5f432715bbbffe))


### :memo: Documentation

* `@egjs/conveyer`
    * add useSideWheel demo (#16) ([bc1486d](https://github.com/naver/egjs-conveyer/commit/bc1486d63ec1b8a505259c16e73305c358e68745))
    * update jsdoc-to-mdx and fix types (#47) ([0210e64](https://github.com/naver/egjs-conveyer/commit/0210e64ea7c1604e9b1da384777d5c4ef2952ff1))
* `@egjs/vue2-conveyer`
    * fix README ([1eedb60](https://github.com/naver/egjs-conveyer/commit/1eedb608b437c3b401dcd28036aab4b0cbf30fa5))
* Other
    * fix latest and version docs react import (#33) ([90a8451](https://github.com/naver/egjs-conveyer/commit/90a8451414b1322f228a567aa1d07ef63c13919f))
    * fix trailingSlash (#9) ([a56cd37](https://github.com/naver/egjs-conveyer/commit/a56cd3748eb3a2857ab3d6178d852c500bb61173))


### :house: Code Refactoring

* `@egjs/conveyer`
    * apply lerna (#10) ([ec71888](https://github.com/naver/egjs-conveyer/commit/ec7188889b9de84a8333b7365920ef6d9f6d635a))
    * remove itemElements member ([c666863](https://github.com/naver/egjs-conveyer/commit/c6668637661dcb062fd98b5058af6fc987ca200f))


### :mega: Other

* All
    * add files field in package.json ([b61b084](https://github.com/naver/egjs-conveyer/commit/b61b084734f98a5fd8e67ddd1401aa7da56dfcc5))
    * Release 1.2.0 ([7ab44c8](https://github.com/naver/egjs-conveyer/commit/7ab44c889182f0f218483ca8b5aff5fb187e577d))
    * Release 1.3.0 ([4c85687](https://github.com/naver/egjs-conveyer/commit/4c8568706b018d1822f1fda316fccd3ab1f6ec17))
    * Release 1.3.1 ([414cb12](https://github.com/naver/egjs-conveyer/commit/414cb12b66d0e2091ab5edbe2295dff0dbbc9b8d))
    * Release 1.4.0 ([2128b77](https://github.com/naver/egjs-conveyer/commit/2128b77ea2a54ee026ac265075c5cf0fda8bc8c7))
    * Release 1.4.1 ([d1dcfcc](https://github.com/naver/egjs-conveyer/commit/d1dcfcce5fe114beb34449b5f11227bd85d7043d))
    * Release 1.4.2 ([e5b8b33](https://github.com/naver/egjs-conveyer/commit/e5b8b3319c88ba49c09914de7f41894b5a62fbe4))
    * Release 1.4.3 ([6bcefc1](https://github.com/naver/egjs-conveyer/commit/6bcefc1f16a014fc4c4994b12ac5b32bc69161eb))
    * Release 1.4.4 ([eed54b2](https://github.com/naver/egjs-conveyer/commit/eed54b2f926b7767068e9054325e8d785c5a6ca1))
    * Release 1.4.5 ([f9c2647](https://github.com/naver/egjs-conveyer/commit/f9c2647ff49177af0ea17e2c2adb231fbed5e0cb))
    * Release 1.4.6 ([6f3f2a0](https://github.com/naver/egjs-conveyer/commit/6f3f2a02d331e21151c04258168daede633967d6))
    * Release 1.4.7 ([d85dc2a](https://github.com/naver/egjs-conveyer/commit/d85dc2a977249b91a26713fb981b18d4402dab1f))
    * Release 1.4.8 ([7567d41](https://github.com/naver/egjs-conveyer/commit/7567d419b3d6d40736e06392d54d283f3b91449c))
    * Release 1.4.9 ([c4e3351](https://github.com/naver/egjs-conveyer/commit/c4e3351f718d8d784f243f909d5ea8cb3a89f2a3))
    * Release 1.5.0 ([40bf623](https://github.com/naver/egjs-conveyer/commit/40bf623ab60d8ab7476433e35fdd744f5da30c7f))
    * Release 1.5.1 ([52fa6c6](https://github.com/naver/egjs-conveyer/commit/52fa6c668936a00e541622821aa3c984df7f835a))
    * Release 1.6.1 ([6df6706](https://github.com/naver/egjs-conveyer/commit/6df6706082edce8ab896a32a50ebaca0c53ce21d))
    * Release 1.6.2 ([5559d6c](https://github.com/naver/egjs-conveyer/commit/5559d6c1946211148d56f997a2c50f6a33d5760d))
    * Release 1.7.0 ([40b491b](https://github.com/naver/egjs-conveyer/commit/40b491b1b0e7575caaee136dd8cda67af2339a90))
    * Release 1.7.1 ([08f76fd](https://github.com/naver/egjs-conveyer/commit/08f76fdc2176c3a640c969103b283cc686311b7e))
    * update dependencies ([0630847](https://github.com/naver/egjs-conveyer/commit/06308477eda17a04c7bcef99543b36bb6ac969a3))
    * update packages versions ([3fd6ab5](https://github.com/naver/egjs-conveyer/commit/3fd6ab56e31ad2b95448bf8f81bc50b1112e3d27))
    * update packages versions ([5214358](https://github.com/naver/egjs-conveyer/commit/52143582432efe67994a016525cba898d0e4aa6d))
    * update packages versions ([34785f2](https://github.com/naver/egjs-conveyer/commit/34785f27897a3c7b983bc9f18ce50fdc517c9757))
    * update packages versions ([bdbf252](https://github.com/naver/egjs-conveyer/commit/bdbf2520a26cc3bdb299dd7b4bfbef7a15b1e889))
    * update packages versions ([b1a0858](https://github.com/naver/egjs-conveyer/commit/b1a0858fa3a3cd94d6c0ab1abed505d106e75d14))
    * update packages versions ([adcc2ce](https://github.com/naver/egjs-conveyer/commit/adcc2ce99e160cfe334e7f7d50e1e7d8e5449ae5))
    * update packages versions ([b7d57e1](https://github.com/naver/egjs-conveyer/commit/b7d57e17a1a7603d295033fbf351a180206bad15))
    * update packages versions ([989c041](https://github.com/naver/egjs-conveyer/commit/989c041877d9960b809030b5b4fd5af8097da2ba))
    * update packages versions ([05d9ceb](https://github.com/naver/egjs-conveyer/commit/05d9ceba27607f6c2cec41cf725f30d88fc8196d))
    * update packages versions ([859e335](https://github.com/naver/egjs-conveyer/commit/859e3358a6d12fea7f95299b13d70427a1a9d2e6))
    * update packages versions ([21ab1df](https://github.com/naver/egjs-conveyer/commit/21ab1df94e32216e5436ad53a028035c644d849d))
    * update packages versions ([1b3e74a](https://github.com/naver/egjs-conveyer/commit/1b3e74a8b58e77b5e27104324602bd7a7de38b7b))
    * update packages versions ([56e6a99](https://github.com/naver/egjs-conveyer/commit/56e6a99509405f43966daa03c3fb3953ed26cdfa))
    * update packages versions ([515ede9](https://github.com/naver/egjs-conveyer/commit/515ede994bc12a460d0c12abb5a62da9571218ac))
    * update packages versions ([491417a](https://github.com/naver/egjs-conveyer/commit/491417a29531c18ecd8dc13b58debf75b3ba3292))
    * update packages versions ([037314d](https://github.com/naver/egjs-conveyer/commit/037314d60b7799066f588f073273d56eb4c308b7))
    * update packages versions ([6e5ff78](https://github.com/naver/egjs-conveyer/commit/6e5ff787f1d1f90305261b4cf30ebb408bb0543c))
    * update packages versions ([4dedd8a](https://github.com/naver/egjs-conveyer/commit/4dedd8afdc77d40220e209c1516a0f6cbe0a2e3a))
* Other
    * fix github actions workflows ([dc5ce85](https://github.com/naver/egjs-conveyer/commit/dc5ce85827e8f717d9c4d470064aa6dcd2aa0c6c))
    * fix github actions workflows ([0de06d4](https://github.com/naver/egjs-conveyer/commit/0de06d4d407f62384cef498f2bb6dc8bf30f344e))
    * **release:** Release 1.1.0 ([cf4be00](https://github.com/naver/egjs-conveyer/commit/cf4be00e5a46c58d78b29d9b3f20644f5a1ec42d))
    * update demo script ([e3d19e9](https://github.com/naver/egjs-conveyer/commit/e3d19e9bd9e98e59260a5881b462576109bf68f7))



## [1.7.1](https://github.com/naver/egjs-conveyer/compare/1.7.0...1.7.1) (2023-09-27)
### :sparkles: Packages
* `@egjs/conveyer` 1.7.1
* `@egjs/react-conveyer` 1.7.1
* `@egjs/svelte-conveyer` 1.7.1
* `@egjs/vue-conveyer` 1.7.1
* `@egjs/vue2-conveyer` 1.7.1
* `@egjs/ngx-conveyer` 1.7.1


### :bug: Bug Fix

* `@egjs/conveyer`
    * fix scroll methods moving to invalid position (#53) ([a8bbe20](https://github.com/naver/egjs-conveyer/commit/a8bbe201bf69081603cbdeb7b316e94aa746bee8))


### :mega: Other

* All
    * update packages versions ([5214358](https://github.com/naver/egjs-conveyer/commit/52143582432efe67994a016525cba898d0e4aa6d))



## [1.7.0](https://github.com/naver/egjs-conveyer/compare/1.6.2...1.7.0) (2023-09-22)
### :sparkles: Packages
* `@egjs/conveyer` 1.7.0
* `@egjs/react-conveyer` 1.7.0
* `@egjs/svelte-conveyer` 1.7.0
* `@egjs/vue-conveyer` 1.7.0
* `@egjs/vue2-conveyer` 1.7.0
* `@egjs/ngx-conveyer` 1.7.0


### :rocket: New Features

* `@egjs/conveyer`
    * add useResizeObserver option (#51) ([57138e7](https://github.com/naver/egjs-conveyer/commit/57138e7923e00705e6d275bbd750c2e0db90cfea))


### :house: Code Refactoring

* `@egjs/conveyer`
    * remove itemElements member ([c666863](https://github.com/naver/egjs-conveyer/commit/c6668637661dcb062fd98b5058af6fc987ca200f))


### :mega: Other

* All
    * update packages versions ([34785f2](https://github.com/naver/egjs-conveyer/commit/34785f27897a3c7b983bc9f18ce50fdc517c9757))



## [1.6.2](https://github.com/naver/egjs-conveyer/compare/1.6.1...1.6.2) (2023-08-25)
### :sparkles: Packages
* `@egjs/conveyer` 1.6.2
* `@egjs/react-conveyer` 1.6.2
* `@egjs/svelte-conveyer` 1.6.2
* `@egjs/vue-conveyer` 1.6.2
* `@egjs/vue2-conveyer` 1.6.2
* `@egjs/ngx-conveyer` 1.6.2


### :bug: Bug Fix

* `@egjs/conveyer`
    * fix no intersection item with intersection option (#49) ([7de868b](https://github.com/naver/egjs-conveyer/commit/7de868bea09999c1f02c3758e763302a383161ec))


### :memo: Documentation

* `@egjs/conveyer`
    * update jsdoc-to-mdx and fix types (#47) ([0210e64](https://github.com/naver/egjs-conveyer/commit/0210e64ea7c1604e9b1da384777d5c4ef2952ff1))


### :mega: Other

* All
    * update packages versions ([bdbf252](https://github.com/naver/egjs-conveyer/commit/bdbf2520a26cc3bdb299dd7b4bfbef7a15b1e889))
* Other
    * update demo script ([e3d19e9](https://github.com/naver/egjs-conveyer/commit/e3d19e9bd9e98e59260a5881b462576109bf68f7))



## [1.6.1](https://github.com/naver/egjs-conveyer/compare/1.5.1...1.6.1) (2023-08-03)
### :sparkles: Packages
* `@egjs/conveyer` 1.6.1
* `@egjs/react-conveyer` 1.6.1
* `@egjs/svelte-conveyer` 1.6.1
* `@egjs/vue-conveyer` 1.6.1
* `@egjs/vue2-conveyer` 1.6.1
* `@egjs/ngx-conveyer` 1.6.1


### :rocket: New Features

* All
    * add intersection option (#46) ([091fda5](https://github.com/naver/egjs-conveyer/commit/091fda54a5a669d8db26d6829a3d1b2b6b9a211d))


### :mega: Other

* All
    * update packages versions ([b1a0858](https://github.com/naver/egjs-conveyer/commit/b1a0858fa3a3cd94d6c0ab1abed505d106e75d14))



## [1.5.1](https://github.com/naver/egjs-conveyer/compare/1.5.0...1.5.1) (2023-07-27)
### :sparkles: Packages
* `@egjs/conveyer` 1.5.1
* `@egjs/react-conveyer` 1.5.1
* `@egjs/svelte-conveyer` 1.5.1
* `@egjs/vue-conveyer` 1.5.1
* `@egjs/vue2-conveyer` 1.5.1
* `@egjs/ngx-conveyer` 1.5.1


### :bug: Bug Fix

* `@egjs/conveyer`
    * use preventClickOnDrag of Axes (#43) ([1743ce1](https://github.com/naver/egjs-conveyer/commit/1743ce190235477d3a76f054afcbe03a921618cc))


### :mega: Other

* All
    * update packages versions ([adcc2ce](https://github.com/naver/egjs-conveyer/commit/adcc2ce99e160cfe334e7f7d50e1e7d8e5449ae5))



## [1.5.0](https://github.com/naver/egjs-conveyer/compare/1.4.9...1.5.0) (2023-06-22)
### :sparkles: Packages
* `@egjs/conveyer` 1.5.0
* `@egjs/react-conveyer` 1.5.0
* `@egjs/svelte-conveyer` 1.5.0
* `@egjs/vue-conveyer` 1.5.0
* `@egjs/vue2-conveyer` 1.5.0
* `@egjs/ngx-conveyer` 1.5.0


### :rocket: New Features

* `@egjs/conveyer`
    * add boundaryMargin option (#40) ([5d1cf77](https://github.com/naver/egjs-conveyer/commit/5d1cf7752d179d34e35ebd5843a628306f4d0e7d))


### :bug: Bug Fix

* `@egjs/conveyer`
    * fix incorrect isTrusted value in finishScroll event (#41) ([7a32ec8](https://github.com/naver/egjs-conveyer/commit/7a32ec86ebc98ae663b5c460aa40af3e5ab32a74))


### :mega: Other

* All
    * update packages versions ([b7d57e1](https://github.com/naver/egjs-conveyer/commit/b7d57e17a1a7603d295033fbf351a180206bad15))



## [1.4.9](https://github.com/naver/egjs-conveyer/compare/1.4.8...1.4.9) (2023-06-02)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.9
* `@egjs/react-conveyer` 1.4.9
* `@egjs/svelte-conveyer` 1.4.9
* `@egjs/vue-conveyer` 1.4.9
* `@egjs/vue2-conveyer` 1.4.9
* `@egjs/ngx-conveyer` 1.4.9


### :rocket: New Features

* `@egjs/ngx-conveyer`
    * **ngx-conveyer:** reduce view updates and fix outputs (#32) ([85c6c30](https://github.com/naver/egjs-conveyer/commit/85c6c30d90ced259017ee20e002e257eb4cc1034))


### :bug: Bug Fix

* `@egjs/conveyer`
    * fix instanceof Element (#38) ([72fec40](https://github.com/naver/egjs-conveyer/commit/72fec4029eafe87cd3e387939f9e89edf6179573))
    * scrollIntoView ending earlier than the duration given as an option (#35) ([3a42aa3](https://github.com/naver/egjs-conveyer/commit/3a42aa3fad6a860ec5d679c953b26c8168a3eeb2))
    * set isHold to false when release occur (#34) ([07ae681](https://github.com/naver/egjs-conveyer/commit/07ae68193d94b896e5dbc9b0f2cda7a86bed38e8))
* Other
    * fix broken document link (#30) ([a716e2a](https://github.com/naver/egjs-conveyer/commit/a716e2ac0b4cf975420de9e8cd5f432715bbbffe))


### :memo: Documentation

* fix latest and version docs react import (#33) ([90a8451](https://github.com/naver/egjs-conveyer/commit/90a8451414b1322f228a567aa1d07ef63c13919f))


### :mega: Other

* All
    * update packages versions ([989c041](https://github.com/naver/egjs-conveyer/commit/989c041877d9960b809030b5b4fd5af8097da2ba))



## [1.4.8](https://github.com/naver/egjs-conveyer/compare/1.4.7...1.4.8) (2023-01-12)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.8
* `@egjs/react-conveyer` 1.4.8
* `@egjs/svelte-conveyer` 1.4.8
* `@egjs/vue-conveyer` 1.4.8
* `@egjs/vue2-conveyer` 1.4.8
* `@egjs/ngx-conveyer` 1.4.8


### :bug: Bug Fix

* All
    * fix commonjs issue (#29) ([cc62f6f](https://github.com/naver/egjs-conveyer/commit/cc62f6fbffd6d183810108337a8b49e9ad476ced))


### :mega: Other

* All
    * update packages versions ([05d9ceb](https://github.com/naver/egjs-conveyer/commit/05d9ceba27607f6c2cec41cf725f30d88fc8196d))



## [1.4.7](https://github.com/naver/egjs-conveyer/compare/1.4.6...1.4.7) (2022-12-28)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.7
* `@egjs/react-conveyer` 1.4.7
* `@egjs/svelte-conveyer` 1.4.7
* `@egjs/vue-conveyer` 1.4.7
* `@egjs/vue2-conveyer` 1.4.7
* `@egjs/ngx-conveyer` 1.4.7


### :bug: Bug Fix

* All
    * fix svelte field (#28) ([998ccee](https://github.com/naver/egjs-conveyer/commit/998ccee276579ab09aaf0eaa519d7b8a39fe084e))


### :mega: Other

* All
    * update packages versions ([859e335](https://github.com/naver/egjs-conveyer/commit/859e3358a6d12fea7f95299b13d70427a1a9d2e6))



## [1.4.6](https://github.com/naver/egjs-conveyer/compare/1.4.5...1.4.6) (2022-12-02)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.6
* `@egjs/react-conveyer` 1.4.6
* `@egjs/svelte-conveyer` 1.4.6
* `@egjs/vue-conveyer` 1.4.6
* `@egjs/vue2-conveyer` 1.4.6
* `@egjs/ngx-conveyer` 1.4.6


### :bug: Bug Fix

* `@egjs/svelte-conveyer`
    * fix incorrect main/module/exports. (#24) ([976d2aa](https://github.com/naver/egjs-conveyer/commit/976d2aa27d4000bd5733325059913793b1542a6d))
* `@egjs/conveyer`
    * remove axes instance on destory (#26) ([f7e7769](https://github.com/naver/egjs-conveyer/commit/f7e7769fc4ee9e9ba4d58f228ce3ac4480d00d9f))


### :mega: Other

* All
    * update packages versions ([21ab1df](https://github.com/naver/egjs-conveyer/commit/21ab1df94e32216e5436ad53a028035c644d849d))



## [1.4.5](https://github.com/naver/egjs-conveyer/compare/1.4.3...1.4.5) (2022-10-14)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.5
* `@egjs/react-conveyer` 1.4.5
* `@egjs/svelte-conveyer` 1.4.5
* `@egjs/vue-conveyer` 1.4.5
* `@egjs/vue2-conveyer` 1.4.5
* `@egjs/ngx-conveyer` 1.4.5


### :bug: Bug Fix

* `@egjs/vue2-conveyer`, `@egjs/vue-conveyer`, `@egjs/svelte-conveyer`, `@egjs/react-conveyer`, `@egjs/conveyer`
    * add declaration files to package (#23) ([8b907db](https://github.com/naver/egjs-conveyer/commit/8b907dbcc803b237d65ff82b84e922a08dc59930))
* `@egjs/conveyer`
    * check autoInit must be false (#22) ([d86581d](https://github.com/naver/egjs-conveyer/commit/d86581d1827ae79954df84c2165e6e33659fd5e1))


### :mega: Other

* All
    * Release 1.4.4 ([eed54b2](https://github.com/naver/egjs-conveyer/commit/eed54b2f926b7767068e9054325e8d785c5a6ca1))
    * update packages versions ([1b3e74a](https://github.com/naver/egjs-conveyer/commit/1b3e74a8b58e77b5e27104324602bd7a7de38b7b))



## [1.4.4](https://github.com/naver/egjs-conveyer/compare/1.4.3...1.4.4) (2022-09-07)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.4
* `@egjs/react-conveyer` 1.4.4
* `@egjs/svelte-conveyer` 1.4.4
* `@egjs/vue-conveyer` 1.4.4
* `@egjs/vue2-conveyer` 1.4.4
* `@egjs/ngx-conveyer` 1.4.4


### :bug: Bug Fix

* `@egjs/conveyer`
    * check autoInit must be false ([86cfb1d](https://github.com/naver/egjs-conveyer/commit/86cfb1d5dd8a895b8c7411e97b455baa1f3ee610))


### :mega: Other

* All
    * update packages versions ([a2dc556](https://github.com/naver/egjs-conveyer/commit/a2dc556610b062e3a6c7e2624712df2b00ad9a83))



## [1.4.3](https://github.com/naver/egjs-conveyer/compare/1.3.0...1.4.3) (2022-09-07)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.3
* `@egjs/react-conveyer` 1.4.3
* `@egjs/svelte-conveyer` 1.4.3
* `@egjs/vue-conveyer` 1.4.3
* `@egjs/vue2-conveyer` 1.4.3
* `@egjs/ngx-conveyer` 1.4.3


### :rocket: New Features

* All
    * add cfcs module (#17) ([6dc1715](https://github.com/naver/egjs-conveyer/commit/6dc17158b701fa9cf997bec9dff8dd7be4d79eaf))


### :bug: Bug Fix

* All
    * fix isReachStart's default value (#18) ([9c49266](https://github.com/naver/egjs-conveyer/commit/9c492663a45ca2ec0eabdfae85892906003a6fe9))
* `@egjs/conveyer`
    * fix autoInit option not working correctly (#21) ([11bb2f1](https://github.com/naver/egjs-conveyer/commit/11bb2f178c983e4576765ee42850613142b8d239))
    * update axes version (#20) ([57f83fa](https://github.com/naver/egjs-conveyer/commit/57f83fada28dec52bf63a0bf448dd22030df63d2))


### :memo: Documentation

* `@egjs/conveyer`
    * add useSideWheel demo (#16) ([bc1486d](https://github.com/naver/egjs-conveyer/commit/bc1486d63ec1b8a505259c16e73305c358e68745))
* `@egjs/vue2-conveyer`
    * fix README ([1eedb60](https://github.com/naver/egjs-conveyer/commit/1eedb608b437c3b401dcd28036aab4b0cbf30fa5))


### :mega: Other

* All
    * add files field in package.json ([b61b084](https://github.com/naver/egjs-conveyer/commit/b61b084734f98a5fd8e67ddd1401aa7da56dfcc5))
    * Release 1.3.1 ([414cb12](https://github.com/naver/egjs-conveyer/commit/414cb12b66d0e2091ab5edbe2295dff0dbbc9b8d))
    * Release 1.4.0 ([2128b77](https://github.com/naver/egjs-conveyer/commit/2128b77ea2a54ee026ac265075c5cf0fda8bc8c7))
    * Release 1.4.1 ([d1dcfcc](https://github.com/naver/egjs-conveyer/commit/d1dcfcce5fe114beb34449b5f11227bd85d7043d))
    * Release 1.4.2 ([e5b8b33](https://github.com/naver/egjs-conveyer/commit/e5b8b3319c88ba49c09914de7f41894b5a62fbe4))
    * update packages versions ([56e6a99](https://github.com/naver/egjs-conveyer/commit/56e6a99509405f43966daa03c3fb3953ed26cdfa))
    * update packages versions ([515ede9](https://github.com/naver/egjs-conveyer/commit/515ede994bc12a460d0c12abb5a62da9571218ac))
    * update packages versions ([491417a](https://github.com/naver/egjs-conveyer/commit/491417a29531c18ecd8dc13b58debf75b3ba3292))
    * update packages versions ([037314d](https://github.com/naver/egjs-conveyer/commit/037314d60b7799066f588f073273d56eb4c308b7))



## [1.4.2](https://github.com/naver/egjs-conveyer/compare/1.4.1...1.4.2) (2022-08-24)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.2
* `@egjs/react-conveyer` 1.4.2
* `@egjs/svelte-conveyer` 1.4.2
* `@egjs/vue-conveyer` 1.4.2
* `@egjs/vue2-conveyer` 1.4.2
* `@egjs/ngx-conveyer` 1.4.2


### :bug: Bug Fix

* `@egjs/conveyer`
    * update axes version (#20) ([57f83fa](https://github.com/naver/egjs-conveyer/commit/57f83fada28dec52bf63a0bf448dd22030df63d2))


### :mega: Other

* All
    * update packages versions ([515ede9](https://github.com/naver/egjs-conveyer/commit/515ede994bc12a460d0c12abb5a62da9571218ac))



## [1.4.1](https://github.com/naver/egjs-conveyer/compare/1.4.0...1.4.1) (2022-08-05)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.1
* `@egjs/react-conveyer` 1.4.1
* `@egjs/svelte-conveyer` 1.4.1
* `@egjs/vue-conveyer` 1.4.1
* `@egjs/vue2-conveyer` 1.4.1
* `@egjs/ngx-conveyer` 1.4.1


### :mega: Other

* All
    * add files field in package.json ([b61b084](https://github.com/naver/egjs-conveyer/commit/b61b084734f98a5fd8e67ddd1401aa7da56dfcc5))



## [1.4.0](https://github.com/naver/egjs-conveyer/compare/1.3.1...1.4.0) (2022-08-04)
### :sparkles: Packages
* `@egjs/conveyer` 1.4.0
* `@egjs/react-conveyer` 1.4.0
* `@egjs/svelte-conveyer` 1.4.0
* `@egjs/vue-conveyer` 1.4.0
* `@egjs/vue2-conveyer` 1.4.0
* `@egjs/ngx-conveyer` 1.4.0


### :rocket: New Features

* All
    * add cfcs module (#17) ([6dc1715](https://github.com/naver/egjs-conveyer/commit/6dc17158b701fa9cf997bec9dff8dd7be4d79eaf))


### :bug: Bug Fix

* All
    * fix isReachStart's default value (#18) ([9c49266](https://github.com/naver/egjs-conveyer/commit/9c492663a45ca2ec0eabdfae85892906003a6fe9))


### :memo: Documentation

* `@egjs/vue2-conveyer`
    * fix README ([1eedb60](https://github.com/naver/egjs-conveyer/commit/1eedb608b437c3b401dcd28036aab4b0cbf30fa5))


### :mega: Other

* All
    * update packages versions ([491417a](https://github.com/naver/egjs-conveyer/commit/491417a29531c18ecd8dc13b58debf75b3ba3292))



## [1.3.1](https://github.com/naver/egjs-conveyer/compare/1.3.0...1.3.1) (2022-07-01)
### :sparkles: Packages
* `@egjs/conveyer` 1.3.1
* `@egjs/react-conveyer` 1.3.1
* `@egjs/svelte-conveyer` 1.3.1
* `@egjs/vue-conveyer` 1.3.1
* `@egjs/vue2-conveyer` 1.3.1
* `@egjs/ngx-conveyer` 1.3.1


### :memo: Documentation

* `@egjs/conveyer`
    * add useSideWheel demo (#16) ([bc1486d](https://github.com/naver/egjs-conveyer/commit/bc1486d63ec1b8a505259c16e73305c358e68745))


### :mega: Other

* All
    * update packages versions ([037314d](https://github.com/naver/egjs-conveyer/commit/037314d60b7799066f588f073273d56eb4c308b7))



## [1.3.0](https://github.com/naver/egjs-conveyer/compare/1.2.0...1.3.0) (2022-06-23)
### :sparkles: Packages
* `@egjs/conveyer` 1.3.0
* `@egjs/react-conveyer` 1.3.0
* `@egjs/svelte-conveyer` 1.3.0
* `@egjs/vue-conveyer` 1.3.0
* `@egjs/vue2-conveyer` 1.3.0
* `@egjs/ngx-conveyer` 1.3.0


### :rocket: New Features

* `@egjs/conveyer`
    * use side wheel to move conveyer (#15) ([3cdeab5](https://github.com/naver/egjs-conveyer/commit/3cdeab57a53cae679972696f034b325f7dd3c32c))


### :mega: Other

* All
    * update dependencies ([0630847](https://github.com/naver/egjs-conveyer/commit/06308477eda17a04c7bcef99543b36bb6ac969a3))
    * update packages versions ([6e5ff78](https://github.com/naver/egjs-conveyer/commit/6e5ff787f1d1f90305261b4cf30ebb408bb0543c))
* Other
    * fix github actions workflows ([dc5ce85](https://github.com/naver/egjs-conveyer/commit/dc5ce85827e8f717d9c4d470064aa6dcd2aa0c6c))
    * fix github actions workflows ([0de06d4](https://github.com/naver/egjs-conveyer/commit/0de06d4d407f62384cef498f2bb6dc8bf30f344e))



## [1.2.0](https://github.com/naver/egjs-conveyer/compare/1.1.0...1.2.0) (2022-06-02)
### :sparkles: Packages
* `@egjs/conveyer` 1.2.0
* `@egjs/react-conveyer` 1.2.0
* `@egjs/svelte-conveyer` 1.2.0
* `@egjs/vue-conveyer` 1.2.0
* `@egjs/vue2-conveyer` 1.2.0
* `@egjs/ngx-conveyer` 1.2.0


### :rocket: New Features

* `@egjs/conveyer`
    * add nested option (#11) ([f4bd222](https://github.com/naver/egjs-conveyer/commit/f4bd2221d0d3dd1432ce9e9e2ed0874ce0783061))


### :bug: Bug Fix

* `@egjs/conveyer`
    * set isReachEnd (#13) ([5ad7ee0](https://github.com/naver/egjs-conveyer/commit/5ad7ee07e32c9ca1f4765ebc2d62a2b2e5a19c94))


### :memo: Documentation

* fix trailingSlash (#9) ([a56cd37](https://github.com/naver/egjs-conveyer/commit/a56cd3748eb3a2857ab3d6178d852c500bb61173))


### :house: Code Refactoring

* `@egjs/conveyer`
    * apply lerna (#10) ([ec71888](https://github.com/naver/egjs-conveyer/commit/ec7188889b9de84a8333b7365920ef6d9f6d635a))


### :mega: Other

* All
    * update packages versions ([4dedd8a](https://github.com/naver/egjs-conveyer/commit/4dedd8afdc77d40220e209c1516a0f6cbe0a2e3a))
* Other
    * **release:** Release 1.1.0 ([cf4be00](https://github.com/naver/egjs-conveyer/commit/cf4be00e5a46c58d78b29d9b3f20644f5a1ec42d))
