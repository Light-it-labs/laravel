<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dme_providers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('benefit_type');
            $table->string('phone');
            $table->string('fax');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dme_providers');
    }
};
