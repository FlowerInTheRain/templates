package com.templates.domain.models.users

data class UserBasicInformations(val type:String, val reference: String, val jwtToken:String, val
accountVerifiedStatus:Boolean){
    override fun toString(): String {
        return "UserBasicInformations(type='$type', reference='$reference', jwtToken='$jwtToken', accountVerifiedStatus=$accountVerifiedStatus)"
    }
}
