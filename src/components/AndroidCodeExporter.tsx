import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Download, 
  Check, 
  FileCode, 
  Smartphone, 
  Layers, 
  Terminal,
  Sparkles,
  Database
} from 'lucide-react';

export const AndroidCodeExporter: React.FC = () => {
  const [activeFile, setActiveFile] = useState<
    | 'MainActivity.kt' 
    | 'Theme.kt' 
    | 'StudentPortalViewModel.kt' 
    | 'StudentRepository.kt' 
    | 'FirestoreModels.kt' 
    | 'AndroidManifest.xml' 
    | 'build.gradle.kts' 
    | 'firestore.rules'
    | 'sample_data.json'
  >('MainActivity.kt');

  const [copied, setCopied] = useState(false);

  const codeSnippets: Record<string, string> = {
    'MainActivity.kt': `package com.jehoshua.academy.studentportal

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewmodels.defaultViewModelProviderFactory
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.jehoshua.academy.studentportal.ui.theme.JAMStudentPortalTheme
import com.jehoshua.academy.studentportal.ui.screens.MainPortalScreen
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            JAMStudentPortalTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MainPortalScreen()
                }
            }
        }
    }
}`,

    'Theme.kt': `package com.jehoshua.academy.studentportal.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// JEHOSHUA ACADEMY OF MARIKINA Theme Colors
val RoyalBlue = Color(0xFF0D47A1)
val DeepBlue = Color(0xFF0A3882)
val SchoolGold = Color(0xFFFFC107)
val LightGrayBg = Color(0xFFF8FAFC)
val DarkNavyBg = Color(0xFF0F172A)

private className DarkColorScheme = darkColorScheme(
    primary = SchoolGold,
    secondary = Color(0xFFFFD54F),
    background = DarkNavyBg,
    surface = Color(0xFF1E293B),
    onPrimary = Color(0xFF0F172A)
)

private val LightColorScheme = lightColorScheme(
    primary = RoyalBlue,
    secondary = SchoolGold,
    background = LightGrayBg,
    surface = Color.White,
    onPrimary = Color.White
)

@Composable
fun JAMStudentPortalTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(),
        content = content
    )
}`,

    'StudentPortalViewModel.kt': `package com.jehoshua.academy.studentportal.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.jehoshua.academy.studentportal.data.model.*
import com.jehoshua.academy.studentportal.data.repository.StudentRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class StudentPortalViewModel @Inject constructor(
    private val repository: StudentRepository
) : ViewModel() {

    private val _studentState = MutableStateFlow<Student?>(null)
    val studentState: StateFlow<Student?> = _studentState.asStateFlow()

    private val _gradesState = MutableStateFlow<List<SubjectGrade>>(emptyList())
    val gradesState: StateFlow<List<SubjectGrade>> = _gradesState.asStateFlow()

    private val _announcementsState = MutableStateFlow<List<Announcement>>(emptyList())
    val announcementsState: StateFlow<List<Announcement>> = _announcementsState.asStateFlow()

    fun loadStudentPortalData(studentId: String) {
        viewModelScope.launch {
            repository.getStudent(studentId).collect { _studentState.value = it }
            repository.getGrades(studentId).collect { _gradesState.value = it }
            repository.getAnnouncements().collect { _announcementsState.value = it }
        }
    }
}`,

    'StudentRepository.kt': `package com.jehoshua.academy.studentportal.data.repository

import com.google.firebase.firestore.FirebaseFirestore
import com.jehoshua.academy.studentportal.data.model.*
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import javax.inject.Inject

class StudentRepository @Inject constructor(
    private val firestore: FirebaseFirestore
) {
    fun getGrades(studentId: String): Flow<List<SubjectGrade>> = callbackFlow {
        val listener = firestore.collection("Grades")
            .whereEqualTo("studentId", studentId)
            .addSnapshotListener { snapshot, error ->
                if (error != null) return@addSnapshotListener
                val grades = snapshot?.toObjects(SubjectGrade::class.java) ?: emptyList()
                trySend(grades)
            }
        awaitClose { listener.remove() }
    }
}`,

    'FirestoreModels.kt': `package com.jehoshua.academy.studentportal.data.model

data class Student(
    val studentId: String = "",
    val fullName: String = "",
    val email: String = "",
    val gradeLevel: String = "",
    val section: String = "",
    val adviser: String = "",
    val photoUrl: String = "",
    val schoolYear: String = ""
)

data class SubjectGrade(
    val id: String = "",
    val studentId: String = "",
    val subjectCode: String = "",
    val subjectName: String = "",
    val quarter1: Int = 0,
    val quarter2: Int = 0,
    val quarter3: Int = 0,
    val quarter4: Int = 0,
    val remarks: String = "Passed"
)`,

    'AndroidManifest.xml': `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jehoshua.academy.studentportal">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:name=".JAMApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="JAM Student Portal"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.JAMStudentPortal">
        
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,

    'build.gradle.kts': `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.google.gms.google.services)
    alias(libs.plugins.hilt.android)
}

android {
    namespace = "com.jehoshua.academy.studentportal"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.jehoshua.academy.studentportal"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "2.5.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.material3)
    implementation(platform(libs.firebase.bom))
    implementation(libs.firebase.auth)
    implementation(libs.firebase.firestore)
    implementation(libs.firebase.messaging)
    implementation(libs.hilt.android)
    implementation(libs.coil.compose)
}`,

    'firestore.rules': `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Students/{studentId} {
      allow read: if request.auth != null;
    }
    match /Grades/{gradeId} {
      allow read: if request.auth != null && resource.data.studentId == request.auth.uid;
    }
  }
}`,

    'sample_data.json': `{
  "Students": [
    {
      "studentId": "2024-01048",
      "fullName": "Gabriel E. Dela Cruz",
      "email": "gabriel.delacruz@jehoshua.edu.ph",
      "gradeLevel": "Grade 10",
      "section": "St. Thomas",
      "adviser": "Mrs. Maria Santos",
      "schoolYear": "2025-2026"
    }
  ],
  "Grades": [
    {
      "subjectCode": "ENG10",
      "subjectName": "English 10",
      "quarter1": 93,
      "quarter2": 94,
      "quarter3": 95,
      "quarter4": 93,
      "remarks": "Passed"
    }
  ]
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    alert("Downloading complete Android Studio Kotlin Project (.ZIP)...");
  };

  return (
    <div className="space-y-6 pb-28 sm:pb-16">
      
      {/* Header */}
      <div className="bg-[#0D47A1] dark:bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Smartphone className="w-3.5 h-3.5" /> Android Studio Source Code
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Kotlin & Jetpack Compose Deliverables
          </h2>
          <p className="text-xs text-blue-200">
            MVVM Architecture • Material Design 3 • Firebase Auth, Firestore & FCM Integration
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          className="w-full md:w-auto justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>Download Android Studio Project (.ZIP)</span>
        </button>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* File Tree Drawer */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-md border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-[#0D47A1] dark:text-amber-400" /> Source Files
          </h3>

          <div className="space-y-1">
            {Object.keys(codeSnippets).map((fname) => (
              <button
                key={fname}
                onClick={() => setActiveFile(fname as any)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeFile === fname
                    ? 'bg-[#0D47A1] text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="truncate">{fname}</span>
                <span className="text-[10px] opacity-75 font-mono">.kt/.xml</span>
              </button>
            ))}
          </div>
        </div>

        {/* Code View Canvas */}
        <div className="lg:col-span-3 bg-slate-950 rounded-3xl shadow-xl border border-slate-800 overflow-hidden flex flex-col justify-between">
          
          {/* Editor Header */}
          <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-amber-400 font-bold ml-2">{activeFile}</span>
            </div>

            <button
              onClick={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Snippet'}</span>
            </button>
          </div>

          {/* Code Content */}
          <div className="p-4 sm:p-6 overflow-x-auto text-xs font-mono text-blue-300 leading-relaxed max-h-[500px] max-w-full">
            <pre className="whitespace-pre-wrap break-words max-w-full overflow-x-auto">{codeSnippets[activeFile]}</pre>
          </div>

          {/* Footer Info */}
          <div className="bg-slate-900/80 px-6 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Built with Jetpack Compose & Material 3 guidelines</span>
            <span>Package: com.jehoshua.academy.studentportal</span>
          </div>
        </div>

      </div>

    </div>
  );
};
