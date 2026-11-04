const {test}=require('node:test');
const assert=require('node:assert/strict');
const A=require('../accounts.js');
test('password records are salted and verify without storing plaintext',async()=>{
 const a=await A.passwordRecord('demo-only-password'),b=await A.passwordRecord('demo-only-password');
 assert.notEqual(a.salt,b.salt);assert.notEqual(a.hash,b.hash);
 assert.equal(await A.verify('demo-only-password',a),true);
 assert.equal(await A.verify('wrong',a),false);
 assert.equal(await A.verify('anything',{}),false);
});
test('legacy accounts retain identity while plaintext credentials are removed',async()=>{
 const old={id:123,name:'Demo',email:'demo@example.invalid',pass:'old-password',avatar:null};
 const [user]=await A.migrate([old,null,{bad:true}]);
 assert.equal(user.id,123);assert.equal('pass' in user,false);
 assert.equal(await A.verify('old-password',user.password),true);
 assert.equal('password' in A.publicProfile(user),false);
 assert.deepEqual(await A.migrate([user]),[user]);
});
test('corrupt or inaccessible local storage falls back safely',()=>{
 global.localStorage={getItem(){throw new Error('blocked')}};
 assert.deepEqual(A.read('users',[]),[]);
 global.localStorage={getItem(){return '{bad'}};
 assert.equal(A.read('session',null),null);
});
