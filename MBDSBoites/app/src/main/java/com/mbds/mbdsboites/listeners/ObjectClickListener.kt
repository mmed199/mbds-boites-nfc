package com.mbds.mbdsboites.listeners

import com.mbds.newsletter.models.Object

interface ObjectClickListener {
    fun onCustomerClick(`object`: Object, favoriteId:Int?)
}